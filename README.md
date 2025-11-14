# Soundness Mengingatkan 🤖

Discord bot untuk rotasi role harian dengan jadwal otomatis setiap jam 00:00 WIB.

## ✨ Fitur

- 🔄 Rotasi role otomatis setiap hari (jam 00:00 WIB)
- 📝 Menampilkan role hari ini dengan command `!role`
- 💾 Menyimpan state rotasi secara lokal
- ⏰ Jadwal otomatis menggunakan cron job
- 🐬 Notifikasi saat bot aktif

## 📋 Requirements

- Node.js v16.9.0 atau lebih tinggi
- npm atau yarn
- Discord Bot Token
- Discord Server dengan bot yang sudah diundang

## 🚀 Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/username/SoundnessMengingatkan.git
cd SoundnessMengingatkan
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` di root folder:
```env
DISCORD_TOKEN=your_bot_token_here
CHANNEL_ID=your_channel_id_here
```

## ⚙️ Konfigurasi

### Mendapatkan Discord Bot Token

1. Buka [Discord Developer Portal](https://discord.com/developers/applications)
2. Buat aplikasi baru atau pilih aplikasi yang sudah ada
3. Buka tab **Bot**
4. Klik **Reset Token** atau **Copy** untuk mendapatkan token
5. Paste token ke file `.env` sebagai `DISCORD_TOKEN`

### Mengaktifkan Intents

1. Di Discord Developer Portal, tab **Bot**
2. Scroll ke bagian **Privileged Gateway Intents**
3. Aktifkan **MESSAGE CONTENT INTENT** (wajib untuk bot ini)
4. Simpan perubahan

### Mendapatkan Channel ID

1. Aktifkan **Developer Mode** di Discord:
   - Settings → Advanced → Developer Mode
2. Klik kanan pada channel yang ingin digunakan
3. Pilih **Copy ID**
4. Paste ID ke file `.env` sebagai `CHANNEL_ID`

### Mengundang Bot ke Server

Gunakan link berikut dengan permission yang sesuai:

```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2048&integration_type=0&scope=bot
```

Ganti `YOUR_CLIENT_ID` dengan Client ID bot Anda (dapat ditemukan di Discord Developer Portal, tab **General Information**).

**Permission yang diperlukan:**
- Send Messages (2048)

## 🎮 Cara Menjalankan

```bash
node index.js
```

Bot akan otomatis:
- Login ke Discord
- Mengirim pesan role hari ini ke channel yang ditentukan
- Menjadwalkan rotasi role setiap jam 00:00 WIB

## 📝 Command

### `!role`
Menampilkan role hari ini.

**Contoh:**
```
User: !role
Bot: 🐬 **Role Hari Ini:** Bloop
```

## 🔄 Rotasi Role

Bot akan merotasi role secara otomatis dengan urutan:
1. Zippy
2. Bloop
3. Blu
4. Wava
5. Echo
6. (kembali ke Zippy)

Rotasi terjadi setiap hari jam 00:00 WIB (Asia/Jakarta).

## 📁 Struktur Proyek

```
SoundnessMengingatkan/
├── index.js              # File utama bot
├── package.json          # Dependencies
├── .env                  # Environment variables (tidak di-commit)
├── .gitignore            # Git ignore rules
├── rotation-state.json   # State rotasi (auto-generated)
└── README.md             # Dokumentasi
```

## 🔧 Dependencies

- `discord.js` - Discord API library
- `dotenv` - Environment variables
- `node-cron` - Cron job scheduler

## ⚠️ Troubleshooting

### Bot tidak merespons command
- Pastikan bot sudah online di server
- Pastikan **MESSAGE CONTENT INTENT** sudah diaktifkan
- Pastikan bot memiliki permission untuk membaca dan mengirim pesan

### Error "Unknown Channel"
- Pastikan `CHANNEL_ID` di `.env` sudah benar
- Pastikan bot sudah ditambahkan ke server yang memiliki channel tersebut
- Pastikan bot memiliki akses ke channel

### Error "Invalid token"
- Pastikan `DISCORD_TOKEN` di `.env` sudah benar
- Pastikan token tidak ada spasi atau karakter tambahan
- Coba reset token di Discord Developer Portal

### Timeout Error
- Cek koneksi internet
- Cek firewall/antivirus yang mungkin memblokir koneksi
- Bot akan otomatis retry 3 kali

## 📄 License

ISC

## 👤 Author

@ddettaa
