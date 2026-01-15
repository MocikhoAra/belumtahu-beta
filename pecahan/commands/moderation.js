const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = function(client, version, msg, ketiklog) {

    if (!msg.author || msg.author.bot) return;

    const args = msg.content.split(' ');
    const command = args[0].toLowerCase();
    const target = msg.mentions.members.first();

    if (command === '!warn') {
            if (!msg.member.permissions.has(PermissionFlagsBits.ManageMessages)) return msg.reply("Kamu tidak punya izin!");
            if (!target) return msg.reply("Tag dulu orangnya!");
    
            const alasan = args.slice(2).join(' ');
            ketiklog("WARN", target.id, alasan, msg.author.username);
    
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
                    ketiklog("KICK", target.id, alasan, msg.author.username);
    
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
                    ketiklog("BAN", target.id, alasan, msg.author.username);
    
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

}