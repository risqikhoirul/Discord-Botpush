# Discord-Botpush
Bot discord untuk menaikan level secara otomatis, bot ini mendukung multi akun atau multi token.
Pastikan semua configurasi benar sesuai dokumentasi yang telah disediakan.

#### Indonesia
## Get Token?

1. Buka https://discord.com (WEB).
2. Klik open discord in your browser.
3. Inspect element (F12).
4. Masuk ke menu console, dan paste code dibawah ini, dan enter.

```
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```

5. Token anda telah tersimpan di clipboard, silahkan paste di .env pada TOKEN="your_token"

## Install & Usage?

```
git clone https://github.com/risqikhoirul/Discord-Botpush.git
cd Discord-Botpush
```

Edit file .env
Dan silahkan configurasi sesuai yang kamu inginkan.
Bagaimana cara mendapatkan channel id?
https://discord.com/serverID/channelID

```
npm i
npm start
```
## Output:
![](https://raw.githubusercontent.com/risqikhoirul/Discord-Botpush/main/download%20(6).png)

## Donation?
EVM:
```
0x714Cb1145218871fAebD55de36dBE7053cc9C74d
```
Solana:
```
DWfcTjC1MB7oFPwQvF3VRHqwdoGg77A4XbqJKCPvJcd6
```
