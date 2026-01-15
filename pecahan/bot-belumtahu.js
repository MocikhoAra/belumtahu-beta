require('dotenv').config();
const fs = require('fs');
const { version } = require('../package.json'); 
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

const setupTicket = require('./commands/ticket.js');
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
    // Fungsi ketiklog untuk menyimpan log tindakan
    const ketiklog = (tindakan, targetpelakuid, alasan) => {
        if (!fs.existsSync('./logs.json')) {
            fs.writeFileSync('./logs.json', JSON.stringify([]));
        }
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

    // Untuk bagian moderation (warn, kick, ban)
    require('./commands/moderation.js')(client, version, msg, ketiklog);
    // Bagian save & cek logs
    require('./commands/save&ceklogs.js')(client, version, msg, ketiklog);
});

// Bagian slash command
require('./commands/slashcommand.js').function(client, version);

client.login(process.env.DISCORD_TOKEN);