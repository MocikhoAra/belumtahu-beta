Hi👋, its me, MocikhoAra.

Akhir akhir ini aku mulai mencoba membuat bot discord untuk server discordku. Apa alasan aku bikin bot discord ini? Salah satunya untuk **tidak terlalu ketergantungan kepada bot discord publik seperti Carl-Bot, Mee6, Tatsu, Dyno, dan sebagainya**.

### kenapa aku aploud ini di Github Repestory?
1. **Transparansi:** Adanya transparansi kepada member.
2. **Mandiri:** Mengurangi ketergantungan pada bot discord publik.
3. **Portofolio:** bisa menjadikan tempat portofolio.

### Apa saja fitur yang diberikan oleh Bot?
* **Fitur Sapaan:** Memberikan balasan sebagai apresiasi & respek kepada member yang telah meluangkan waktu di server discord.
* **Fitur Moderation:** memungkinkan staff bisa `Warn, Kick, & Ban` jika member, staff, ataupun owner melakukan pelanggaran.
* **Fitur Audit logging:** memungkinkan staff atau owner bisa mengecek riwayat seluruh member.
* **Fitur Cooldowns:** mencegah terjadinya spam & terhindarnya Rate-Limiting.
* **Fitur TimeStamp:** salah satu transparansi dalam bentuk hari, tanggal, bulan, & tahun
* **Fitur MultiPrefix:** memungkinkan user menggunakan lebih dari satu prefix `! /`.
* **Fitur System:** User bisa melihat command: menu, status, hi, update. 

### Bagaimana cara menggunakannya?
Untuk sekarang command masih sedikit dan akan dikembangkan kedepannya.

### Apakah ada rencana untuk menambahkan games?
Untuk sekarang belum ada, karena saya ingin fokus bagian Moderation & Security.

**Bot       :** v0.6.15 (release)
**Runtime   :** v18.19.1
**TypeCode  :** JavaScript(node.js)
**Library   :** discord.js v14.25.1
**Security  :** DotEnv v17.3.1
**Nodemon   :** v3.1.11
**Developer :** MocikhoAra

### UPDATE (Penambahan+, Perubahan/, Pengurangan-, Perbaikan=)
* +Update DotEnv version

### TIPS BIKIN BOT DISCORD DALAM FOLDER
* **Tools:** VScode, javascript, dotenvt, nodemon (not global).

* **HOW TO INSTALL LIBRARY, SECURITY, NODEMON?** Pertama, bikin folder khusus bot discord. Kedua, masuk VScode lalu open folder dan select folder khusus bot kalian. Ketiga, buka terminal VScode dengan ctrl+`. Keempat, ketik npm init -y, setelah itu lanjut npm install discord.js dotenv, then npm install --save-dev nodemon. Sisanya kalian bisa search sendiri, hehe (bisa cari lewat github, ai, youtube, etc).

* **HOW TO INSTALL FOR WINDOWS ENTERPRISE LTSC**
* Buat pengguna Windows Enterprise LTSC bisa ikut cara ini: install node.js di website https://nodejs.org/en/download, untuk Git: https://git-scm.com/install/windows. Setelah download semua jalankan hasil download tersebut. Jika sudah, buka powershell administration, Copy " Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine " lalu ketik A (all), why? karena "Secara default, Windows mematikan fitur menjalankan script .ps1 untuk mencegah virus. Namun, karena npm di Windows berjalan menggunakan script tersebut, kita harus memberikan izin tingkat RemoteSigned agar script lokal (seperti npm yang baru kamu instal) bisa dijalankan." By Gemini :D setelah selesai, kalian bisa ketik " npm init -y ", lalu " npm install discord.js dotenv ", lalu " npm install --save-dev nodemon ".

# NOTE:
* Jika kalian masih baru belajar, gunakan bawaan dulu. Tapi klo pengen lebih tingkat, bisa gunakan dotenv.
