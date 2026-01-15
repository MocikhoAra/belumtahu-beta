module.exports = { function(client, version) {
    const { EmbedBuilder } = require('discord.js');
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const commandName = interaction.commandName.toLowerCase();
        if (commandName === 'status') {
            const datumbot = {
                "Nama": "Belum tahu",
                "Version": version,
                "Pembuat": "MocikhoAra",
                "JenisKode": "JavaScript",
                "Bot": "Official Belum tahu"
            };

            const statusEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🛰️ Status Info - ' + datumbot.Nama)
            .setDescription('Halo! Ini adalah status bot dalam bentuk slash command.')
            .addFields(
                { name: 'Version', value: datumbot.Version, inline: true },
                { name: 'Pembuat', value: datumbot.Pembuat, inline: true },
                { name: 'Jenis Kode', value: datumbot.JenisKode, inline: true },
                { name: 'Bot', value: datumbot.Bot, inline: true },
                { name: 'Status', value: 'Aktif dan berjalan dengan baik', inline: false }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Sistem Aktif • Linux' });
            
            await interaction.reply({ embeds: [statusEmbed] });
    }

        if (commandName === 'menu') {
        await interaction.reply('📑 Gunakan `!menu` untuk melihat daftar lengkap fitur.');
        } 
        if (commandName === 'hi') {
        await interaction.reply(`Hi **${interaction.user.username}**!`);
        }
    });
}};