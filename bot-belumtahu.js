require('dotenv').config();
const fs = require('fs'); //baris ini untuk codingan warn, kick, ban, & logs.
const { version } = require('./package.json'); //impor version dari package.json
const cooldowns = new Map();
const COOLDOWN_TIME = 3000; // 5 detik cooldown antara perintah
const { PermissionFlagsBits, Embed, escapeNumberedList } = require('discord.js');
const prefixmultiEnv = process.env.PREFIX || '! /';
const { Client, GatewayIntentBits, EmbedBuilder, ClientUser } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Saklar agar bot bisa baca chat
    ]
});

const setupTicket = require('./ticket.js');
setupTicket(client);

client.once('clientReady', () => {
    console.log(`Gas! Bot ${client.user.tag} sudah online!`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;

    // Logika rate limiting
    if (cooldowns.has(msg.author.id)) {
        const waktuterakhircommand = cooldowns.get(msg.author.id);
        const waktusekarang = Date.now();

        if (waktusekarang - waktuterakhircommand < COOLDOWN_TIME) {
            const sisawaktucooldown = Math.ceil((COOLDOWN_TIME - (waktusekarang - waktuterakhircommand)) / 1000);
            return msg.reply(`Tunggu ${sisawaktucooldown} detik lagi sebelum menggunakan perintah lain, ya!`)
                .then(sentMsg => {
                    setTimeout(() => { sentMsg.delete().catch(err => console.error("pesan sudah hilang", err)); 
                    }, 3000);
                })
        }
    }
    cooldowns.set(msg.author.id, Date.now());
    setTimeout(() => cooldowns.delete(msg.author.id), COOLDOWN_TIME);

    // Multi prefix
    const prefixmultiuse = prefixmultiEnv.split(' ').find(prefix => msg.content.toLowerCase().startsWith(prefix));
    const username = msg.author.username;
    const sapaharihuman = msg.content.toLowerCase();

    // Objek
    const datumbot = {
        "Nama": "Belum tahu",
        "Version": version,
        "Pembuat": "MocikhoAra",
        "JenisKode": "JavaScript",
        "Bot": "Official Belum tahu"
    };

    // Manggil bot objek
    console.log(`Nama bot Discord ${datumbot.Nama}`);
    console.log(`Version Bot ${datumbot.Version}`);
    console.log(`Pembuat ${datumbot.Pembuat}`);
    console.log(`Jenis kode bot ${datumbot.JenisKode}`);
    console.log(`Bot dari: ${datumbot.Bot}`);

    // Command: status
    if (prefixmultiuse && msg.content.toLowerCase() === prefixmultiuse + 'status') {
        const statusEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🛰️ Status Info - ' + datumbot.Nama)
            .setDescription('Halo! Berikut adalah informasi bot discord saat ini.')
            .addFields(
                { name: '🤖 Nama Bot', value: datumbot.Nama, inline: true },
                { name: '🔢 Versi', value: datumbot.Version, inline: true },
                { name: '💻 Bahasa', value: datumbot.JenisKode, inline: true }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Sistem Aktif • Linux' });

        msg.reply({ embeds: [statusEmbed] });
    }

    // Command: hi
    if (prefixmultiuse && msg.content.toLowerCase() === prefixmultiuse + 'hi') {
        msg.reply(`Hi juga ${username}.`);
    }

    // Command: menu
    if (prefixmultiuse && msg.content.toLowerCase() === prefixmultiuse + 'menu') {
        const statusEmbed = new EmbedBuilder()
            .setColor(0x0021FA)
            .setTitle('📑 Daftar command - ' + datumbot.Nama)
            .setDescription('Gunakan prefix `! & /` untuk menggunakan fitur tersebut.')
            .addFields(
                { name: '🌐 command', value: '`status`, `menu`, `hi`, `update`', inline: false },
                { name: '💬 sapaan', value: '`halo bot`, `pagi`, `siang`, `sore`, `malam`', inline: false }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `Ketik perintah dengan benar` })
            .setTimestamp();

        msg.reply({ embeds: [statusEmbed] });
    }

    // Command: update apa aja yg baru khusus global
    if (prefixmultiuse && msg.content.toLowerCase() === prefixmultiuse + 'update') {
        const statusEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🆕 Update Terbaru - ' + datumbot.Nama)
            .setDescription('Berikut adalah update terbaru dari bot ini.')
            .addFields(
                { name: 'Versi', value: datumbot.Version, inline: true },
                { name: 'Fitur Baru', value: '`- ticket`', inline: false }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `Update untuk member` })
            .setTimestamp();

        msg.reply({ embeds: [statusEmbed] });
    }

    // Logika lanjutan versi nyapa nama spesifik
    if (msg.content.toLowerCase().includes('halo bot')) {
        const username = msg.author.username.toLowerCase();

        //Logika if respon untuk khusus orang ke kamu
        if (username === 'mocikhoara') {
            msg.reply('Halo human spesial, apa yang kamu mau?');
        } else {
            msg.reply(`Halo <@${msg.author.id}>, ada apa?`);
        }
    }

    //Nyapa pagi, siang, sore, malam.
    //gunakan struktur if- if else biar beruntun.
    if (sapaharihuman.includes('pagi')) {
        msg.reply(`Selamat pagi juga <@${msg.author.id}>, selamat beraktivitas dihari pagi mu ini!`);
    } else if (sapaharihuman.includes('siang')) {
        msg.reply(`Selamat siang juga <@${msg.author.id}>, Semangat ya!`);
    } else if (sapaharihuman.includes('sore')) {
        msg.reply(`Selamat sore juga <@${msg.author.id}>. Istirahat yuk sebentar, biar kamu ga terlalu stress`);
    } else if (sapaharihuman.includes('malam')) {
        msg.reply(`Selamat malam juga <@${msg.author.id}>. Terimakasih atas jasamu selama ini, kamu bisa istrahat.`);
    }

    // Stop jika tidak ada prefix
    if (!prefixmultiuse) return;

    // Codingan warn, kick, ban, & log
    const args = msg.content.split(' ');
    const command = args[0].toLowerCase();
    const target = msg.mentions.members.first();

    // Fungsi untuk save log
    const ketiklog = (tindakan, targetpelakuid, alasan) => {
        const datumlama = JSON.parse(fs.readFileSync('./logs.json', 'utf-8'));
        const informasilog = {
            waktu: new Date().toLocaleString('id-ID', {
                dateStyle: 'full',
                timeStyle: 'medium'
            }),
            staff: msg.author.username,
            tindakan: tindakan,
            pelakuID: targetpelakuid,
            alasan: alasan || "Tidak ada alasan"
        };
        datumlama.push(informasilog);
        //simpan kembali
        fs.writeFileSync('./logs.json', JSON.stringify(datumlama, null, 2));
    };

    //Logika moderator atau moderasi
    //warn
    if (command === '!warn') {
        if (!msg.member.permissions.has(PermissionFlagsBits.ManageMessages)) return msg.reply("Kamu tidak punya izin!");
        if (!target) return msg.reply("Tag dulu orangnya!");

        const alasan = args.slice(2).join(' ');
        ketiklog("WARN", target.id, alasan);

        const warnEmbed = new EmbedBuilder()
            .setColor(0xFFFF00)
            .setTitle('⚠️**WARN**')
            .setDescription(`Seorang member, yaitu <@${target.id}> telah diberikan peringatan.`)
            .addFields(
                { name: '👤 PelakuID', value: `${target.id}`, inline: true },
                { name: '🛡️ Staff', value: `${msg.author.username}`, inline: true },
                { name: '📝 Alasan', value: alasan }
            )
            .setTimestamp();

        msg.reply({ embeds: [warnEmbed] });
    }

    //kick
    if (command === '!kick') {
        if (!msg.member.permissions.has(PermissionFlagsBits.KickMembers)) return msg.reply("Kamu tidak punya izin karena bukan staff!");
        if (!target) return msg.reply("Siapa yang mau dikick?");

        const alasan = args.slice(2).join(' ');
        target.kick(alasan)
            .then(() => {
                ketiklog("KICK", target.id, alasan);

                const kickEmbed = new EmbedBuilder()
                    .setColor(0xFF4500)
                    .setTitle('🚪**Member dikick**')
                    .setDescription(`Seorang member, yaitu <@${target.id}> telah dikick.`)
                    .addFields(
                        { name: 'PelakuID', value: target.id, inline: true },
                        { name: 'Alasan', value: alasan, inline: true }
                    )
                    .setTimestamp();

                msg.reply({ embeds: [kickEmbed] });
            })
            .catch(err => {
                console.error(err);
                msg.reply("Gagal mengkick?! coba cek lagi.");
            });
    }

    //ban
    if (command === '!ban') {
        if (!msg.member.permissions.has(PermissionFlagsBits.BanMembers)) return msg.reply("Kamu tidak punya izin karena bukan Staff!!");
        if (!target) return msg.reply("Siapa yang mau diban?");

        const alasan = args.slice(2).join(' ');
        target.ban({ reason: alasan })
            .then(() => {
                ketiklog("BAN", target.id, alasan);

                const banEmbed = new EmbedBuilder()
                    .setColor(0xC93C1E)
                    .setTitle('🚫**Seseorang telah diban dari server**')
                    .setDescription(`Seorang member, yaitu <@${target.id}> telah diban.`)
                    .addFields(
                        { name: 'PelakuID', value: target.id, inline: true },
                        { name: 'Alasan', value: alasan, inline: true }
                    )
                    .setTimestamp();

                msg.reply({ embeds: [banEmbed] });
            })
            .catch(err => {
                console.error(err);
                msg.reply("Gagal ban? coba cek dulu.");
            });
    }

    //cek log
    if (command === '!ketiklog' || command === '!ceklog') {
        const log = JSON.parse(fs.readFileSync('./logs.json', 'utf-8'));
        if (log.length === 0) return msg.reply("Belum ada catatan dari staff.");

        let listlog = "**Informasi:**\n";
        log.slice(-5).forEach((l, i) => {
            listlog += `**${i + 1}**. ${l.tindakan} **<@${l.pelakuID}>** oleh ${l.staff} \n🗓️${l.waktu} | \n🗒️${l.alasan}`;
        });

        const logEmbed = new EmbedBuilder()
            .setColor(0xBDCBCB)
            .setTitle('🗒️**Catatan PelakuID**')
            .setDescription(listlog)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: 'Menampilkan 5 aktivitas terakhir' })
            .setTimestamp();

        msg.reply({ embeds: [logEmbed] });
    }
});

// --- BAGIAN KHUSUS UNTUK MENJAWAB SLASH COMMAND (/) ---
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

client.login(process.env.DISCORD_TOKEN);