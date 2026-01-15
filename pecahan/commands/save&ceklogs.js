const fs = require('fs');
const { EmbedBuilder } = require('discord.js'); 

module.exports = function(client, version, msg, ketiklog) { 
    const args = msg.content.split(' ');
    const command = args[0].toLowerCase();

    //Cek log terakhir
    if (command === '!ketiklog' || command === '!ceklog') {
        if (!fs.existsSync('./logs.json')) return msg.reply("Belum ada file log.");
        
        const log = JSON.parse(fs.readFileSync('./logs.json', 'utf-8'));
        if (log.length === 0) return msg.reply("Belum ada catatan dari staff.");

        let listlog = "";
        log.slice(-5).forEach((l, i) => {
            listlog += `**${i + 1}**. ${l.tindakan} **<@${l.pelakuID}>** oleh **${l.staff}**\n🗓️ ${l.waktu}\n🗒️ ${l.alasan}\n\n`;
        });

        const logEmbed = new EmbedBuilder()
            .setColor(0xBDCBCB)
            .setTitle('🗒️ Catatan Aktivitas Terbaru')
            .setDescription(listlog)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `Versi Bot: ${version} | Menampilkan 5 aktivitas terakhir` })
            .setTimestamp();

        msg.reply({ embeds: [logEmbed] });
    }
};