const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = function(client) {
    client.on('messageCreate', async (msg) => {
        if (msg.author.bot) return;

        // Setup hanya jalankan sekali di channel khusus tiket
        if (msg.content === '!setup-ticket') {
            if (!msg.member.permissions.has(PermissionFlagsBits.Administrator)) return;

            const embed = new EmbedBuilder()
                .setColor(0xFFFF00) // Kuning
                .setTitle('🎫 Pusat Bantuan')
                .setDescription('Selamat datang! Jika Anda memiliki kendala, laporan, atau pertanyaan, silakan klik tombol di bawah untuk membuka tiket bantuan.')
                .addFields(
                    { name: '⏰ Jam Operasional', value: '09:00 - 00:00 WIB', inline: true },
                    { name: '👤 Staff', value: 'Siap Membantu', inline: true }
                )
                .setFooter({ text: 'Klik "Create Ticket" untuk memulai chat pribadi.' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('buka_tiket')
                    .setLabel('Create Ticket')
                    .setEmoji('📩')
                    .setStyle(ButtonStyle.Secondary) // Warna abu-abu gelap/kuning
            );

            // Hapus chat "!setup-ticket" kamu supaya channel bersih
            msg.delete().catch(() => {});

            // Kirim pesan Embed utamanya (Ini akan menetap selamanya)
            msg.channel.send({ embeds: [embed], components: [row] });
        }

        // Hanya Staff/Owner
        if (msg.content === '!close') {
            if (!msg.channel.name.startsWith('ticket-')) return;

            // Cek Izin Staff/Owner
            if (!msg.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                return msg.reply("❌ Ccuma Staff atau Owner yang bisa tutup tiket ini!");
            }

            msg.reply("⚠️ **Tiket akan dihapus dalam 5 detik...**");
            setTimeout(() => {
                msg.channel.delete().catch(() => {});
            }, 5000);
        }
    });

    // Logika tombol
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton() || interaction.customId !== 'buka_tiket') return;

        const guild = interaction.guild;
        const CATEGORY_ID = process.env.TICKET_CATEGORY_ID;

        try {
            const channel = await guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: CATEGORY_ID, 
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }, // User lain ga bisa liat
                    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] }, // Pembuat tiket bisa liat
                ],
            });

            await interaction.reply({ content: `✅ Tiket kamu sudah dibuka di ${channel}`, ephemeral: true });

            const welcomeEmbed = new EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle('📩 Halo! Ada yang bisa kami bantu?')
                .setDescription(`Hai ${interaction.user}, silakan tulis pesanmu di sini.\n\n**Info:** Hanya Staff yang bisa menutup channel ini dengan \`!close\`.`)
                .setTimestamp();

            channel.send({ embeds: [welcomeEmbed] });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Gagal membuat tiket. Pastikan ID Kategori benar!', ephemeral: true });
        }
    });
};