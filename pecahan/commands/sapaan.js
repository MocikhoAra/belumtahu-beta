module.exports = function(client, version, msg) { 
    if (msg.content.toLowerCase().includes('halo bot')) {
        const username = msg.author.username.toLowerCase();
    //Logika if respon untuk khusus orang ke kamu
    if (username === 'mocikhoara') {
        msg.reply('Halo human spesial, apa yang kamu mau?');
    } else {
        msg.reply(`Halo <@${msg.author.id}>, ada apa?`);
        }
    }
    
    const sapaharihuman = msg.content.toLowerCase();
    if (sapaharihuman.includes('pagi')) {
            msg.reply(`Selamat pagi juga <@${msg.author.id}>, selamat beraktivitas dihari pagi mu ini!`);
    } else if (sapaharihuman.includes('siang')) {
            msg.reply(`Selamat siang juga <@${msg.author.id}>, Semangat ya!`);
    } else if (sapaharihuman.includes('sore')) {
            msg.reply(`Selamat sore juga <@${msg.author.id}>. Istirahat yuk sebentar, biar kamu ga terlalu stress`);
    } else if (sapaharihuman.includes('malam')) {
            msg.reply(`Selamat malam juga <@${msg.author.id}>. Terimakasih atas jasamu selama ini, kamu bisa istrahat.`);
    }
};