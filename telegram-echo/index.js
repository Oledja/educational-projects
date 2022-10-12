process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "photo") {
    bot.sendPhoto(chatId, `https://picsum.photos/200/300?t=${Date.now()}`);
  } else {
    bot.sendMessage(chatId, `Вы написали "${text}"`);
  }
});
