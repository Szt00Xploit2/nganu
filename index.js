const config = require('./config');

const TelegramBot = require('node-telegram-bot-api');
const net = require('net');
const dgram = require('dgram');

// Use the exported token from 'config.js'
const token = config.telegramToken;
const bot = new TelegramBot(token, { polling: true });

let tcpHost = 'localhost';
let tcpPort = 1234;
let udpHost = 'localhost';
let udpPort = 4321;
let tcpClient;
let udpClient;
let tcpMessageCount = 0;
let udpMessageCount = 0;

let messageLimit = 10; // default message limit
let delay = 250; // default delay in milliseconds

// Inline Keyboard Markup
const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Registered TCP', callback_data: 'tcp_settings' }],
      [{ text: 'Registered UDP', callback_data: 'udp_settings' }],
      [{ text: 'Start TCP', callback_data: 'start_tcp' }, { text: 'Start UDP', callback_data: 'start_udp' }],
      [{ text: 'Add TCP Connection', callback_data: 'add_tcp' }, { text: 'Add UDP Connection', callback_data: 'add_udp' }],
      [{ text: 'Set Delay & Limit Traffic', callback_data: 'set_config' }],
      [{ text: 'GitHub Repository', url: 'https://github.com/naix0x' }],
    ],
  },
};

// Function to send inline menu
const sendInlineMenu = (chatId) => {
  bot.sendMessage(chatId, '▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n🅵🅻🅾🅾🅳 🆃🅲🅿 & 🆄🅳🅿\n━━━━━━━━━━━━━━\nAnother commands :\n/stoptcp : Stop TCP Connection\n/stopudp : Stop UDP Connection\n━━━━━━━━━━━━━━━━', inlineKeyboard);
};

// Callback queries handling
bot.on('callback_query', (query) => {
  const { chat, message_id } = query.message;

  switch (query.data) {
    case 'tcp_settings':
      bot.sendMessage(chat.id, `Alamat TCP: ${tcpHost}:${tcpPort}`);
      break;
    case 'udp_settings':
      bot.sendMessage(chat.id, `Alamat UDP: ${udpHost}:${udpPort}`);
      break;
    case 'start_tcp':
      bot.sendMessage(chat.id, 'Mengirim pesan ke server TCP...');
      startTCP(chat.id);
      break;
    case 'start_udp':
      bot.sendMessage(chat.id, 'Mengirim pesan ke server UDP...');
      startUDP(chat.id);
      break;
    case 'add_tcp':
      bot.sendMessage(chat.id, 'Tambahkan koneksi TCP menggunakan perintah /addtcp <host> <port>');
      break;
    case 'add_udp':
      bot.sendMessage(chat.id, 'Tambahkan koneksi UDP menggunakan perintah /addudp <host> <port>');
      break;
    case 'set_config':
      bot.sendMessage(chat.id, 'Atur konfigurasi menggunakan perintah /setconfig <limit-traffic> <delay>');
      break;
    default:
      break;
  }

  // Remove the inline menu after handling the query
  // bot.deleteMessage(chat.id, message_id);
});

// Function to start TCP connection
const startTCP = (chatId) => {
  tcpClient = new net.Socket();
  tcpClient.connect(tcpPort, tcpHost, () => {
    let count = 0;
    tcpClient.on('error', (err) => {
  console.error('TCP Client Error:', err.message);
  bot.sendMessage(chatId, 'Terjadi kesalahan pada koneksi TCP');
});

    const sendTCPMessage = () => {
  count++;
  if (count <= messageLimit && tcpClient && tcpClient.writable) {
    tcpClient.write(`Hello TCP Server! (${count} traffic)`);
    bot.sendMessage(chatId, `TCP message terkirim! (${count} traffic)`);
    setTimeout(sendTCPMessage, delay);
  } else if (tcpClient) {
    bot.sendMessage(chatId, 'Batas limit tercapai');
  } else {
    bot.sendMessage(chatId, 'Koneksi TCP tidak tersedia');
  }
};

    sendTCPMessage();
  });

  tcpClient.on('error', (err) => {
    console.error('TCP Client Error:', err.message);
  });

  tcpClient.on('close', () => {
    console.log('TCP Client Connection Closed');
    // Handle TCP connection closed event here
  });
};

// Function to stop TCP connection
const stopTCP = (chatId) => {
  if (tcpClient) {
    tcpClient.destroy();
    tcpClient = null;
    bot.sendMessage(chatId, 'Koneksi TCP telah dihentikan');
  } else {
    bot.sendMessage(chatId, 'Tidak ada koneksi TCP yang aktif');
  }
};

// Function to start UDP connection
const startUDP = (chatId) => {
  udpClient = dgram.createSocket('udp4');
  let count = 0;

  const sendUDPMessage = () => {
    count++;
    if (count <= messageLimit && udpClient && udpClient.send) {
      const message = Buffer.from(`Hello UDP Server! (${count} traffic)`);

      udpClient.send(message, 0, message.length, udpPort, udpHost, (err) => {
        if (err) {
          console.error('UDP Client Error:', err.message);
          bot.sendMessage(chatId, 'Terjadi kesalahan saat mengirim pesan UDP');
        } else {
          bot.sendMessage(chatId, `UDP message terkirim! (${count} traffic)`);
          setTimeout(sendUDPMessage, delay);
        }
      });
    } else {
      bot.sendMessage(chatId, `Batas limit (${messageLimit}) tercapai.`);
    }
  };

  sendUDPMessage();

  udpClient.on('error', (err) => {
    console.error('UDP Client Error:', err.message);
  });

  udpClient.on('close', () => {
    console.log('UDP Client Connection Closed');
    // Handle UDP connection closed event here
  });
};

// Function to stop UDP connection
const stopUDP = (chatId) => {
  if (udpClient) {
    udpClient.close();
    udpClient = null;
    bot.sendMessage(chatId, 'Koneksi UDP telah dihentikan');
  } else {
    bot.sendMessage(chatId, 'Tidak ada koneksi UDP yang aktif');
  }
};

// Command handling
bot.onText(/\/start/, (msg) => {
  sendInlineMenu(msg.chat.id);
});

bot.onText(/\/addtcp (.+) (.+)/, (msg, match) => {
  const [, host, port] = match;
  tcpHost = host;
  tcpPort = parseInt(port);
  bot.sendMessage(msg.chat.id, `Koneksi TCP telah ditambahkan ke ${tcpHost}:${tcpPort}`);
});

bot.onText(/\/addudp (.+) (.+)/, (msg, match) => {
  const [, host, port] = match;
  udpHost = host;
  udpPort = parseInt(port);
  bot.sendMessage(msg.chat.id, `Koneksi UDP telah ditambahkan ke ${udpHost}:${udpPort}`);
});

bot.onText(/\/stoptcp/, (msg) => {
  stopTCP(msg.chat.id);
});

bot.onText(/\/stopudp/, (msg) => {
  stopUDP(msg.chat.id);
});

bot.onText(/\/setconfig (.+) (.+)/, (msg, match) => {
  const [, limit, newDelay] = match;
  messageLimit = parseInt(limit);
  delay = Math.max(30, parseInt(newDelay)); // Minimum delay set to 30 milliseconds
  bot.sendMessage(msg.chat.id, `Batas limit traffic diubah menjadi ${messageLimit} dan delay diubah menjadi ${delay} milidetik`);
});

// Polling error handling
bot.on('polling_error', (error) => {
  console.log(error);
});
