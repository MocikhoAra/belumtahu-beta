require('dotenv').config();
const { REST, Routes } = require('discord.js');

//Daftarin commnad yg mau digunakan dalam menu.
const command = [
    {
        name: 'status',
        description: 'Cek status informasi bot',
    },
    {
        name: 'menu',
        description: 'Mengecek menu apa aja yg disediakan oleh bot',
    },
    {
        name : 'hi',
        description: 'Untuk menyapa bot',
    }
];

//REST untuk lapor ke Discord
const toolsAPIkomunikasi = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log('Lagi daftarin command ke Pusat Discord, human');
        await toolsAPIkomunikasi.put(
            Routes.applicationCommands("1457916264746975380"),
            { body: command }
        );
        console.log('Kamu berhasil mendaftarkan command / ke Pusat Discord.');
        console.log('Catatan: jika belum muncul, tunggu beberapa menit atau restart Discord kamu');
    }   catch (error) {
            console.log('Terjadi sebuah kesalahan saat deploy:', error);
    }
}) ();