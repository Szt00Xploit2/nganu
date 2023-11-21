# Flood bot TCP & UDP

Bot sends flood traffic using TCP &amp; UDP protocols to target IP Address &amp; Port

TCP and UDP flood can usually be used to attack SAMP, FiveM, Minecraft and other servers. Do not use this script for what I said above, because the purpose of making this bot is only for learning or penetration testing, not to attack targets directly.

## All Information Command

| CMD      | Information      |
|--------------|--------------|
| Registered TCP | View Address TCP |
| Registered UDP | View Address UDP |
| Start TCP | Run Traffic TCP |
| Start UDP | Run Traffic UDP |
| Add TCP Connection | `/addtcp <host> <port>` |
| Add UDP Connection | `/addudp <host> <port>` |
| Set Delay & Limit | `/setconfig <limit-traffic> <delay>` |
| /stoptcp | Stop Connection TCP |
| /stopudp | Stop Connection UDP |

## ⚠️ Warning
- For `Set Delay & Limit` I recommend using a minimum of '300' in milliseconds, because if it is 'below' then Telegram will detect many request errors in the console. 

- and the `traffic limit` is free to enter whatever you like

## Screenshot on Bot

[<img src="screenshot/Screenshot_20231121-224656_Telegram.jpg" width=160>]
[<img src="screenshot/Screenshot_20231121-232415_Telegram.jpg" width=160>]
[<img src="screenshot/Screenshot_20231121-232539_Telegram.jpg" width=160>]

##  Module Installation

```bash
apt install nodejs git npm yarn
```

```bash
npm install node-telegram-bot-api net dgram yarn
```

- ### Ready for go

Prepare youre API Token telegram.

```bash
npm install floodtcpudp
```

```bash
mv node_modules/floodtcpudp ./
```

```bash
cd floodtcpudp
```

- Set your api token in `config.js`

```bash
yarn start
```

## 🤝 Contributing

If you find a bug or want a new feature in this bot, open an issue or pull request and for those who want to contribute to this bot script. Welcome and really appreciate it.

## 📝 License

This project is licensed under the [MIT License](https://github.com/naix0x/Bot-Visitor-Proxy/blob/main/LICENSE).

<img src="https://github.com/naix0x/Bot-Visitor-Proxy/blob/main/demo%20image/images%20(9).png" width=50>

## 🌟 Forks and Stars

If you find this project useful, please give it a star ⭐ and consider forking it 🍴 to support its development and help it reach a wider audience.

## ☕ Project usesless? 

If this project is very helpful, you can support me to be more enthusiastic about developing it

<a href="https://saweria.co/naix0x" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" width="150" ></a>

## 👤 Development

[![Mustofa Bovalone](https://github.com/naix0x.png?size=100)](https://github.com/naix0x) |
----|
[Mustofa Bovalone](https://t.me/maticstable) |
Author, Base, Bug Fixes  |

