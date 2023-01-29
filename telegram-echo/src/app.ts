import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const { text: message } = msg;
  const {
    chat: { id: chatId },
  } = msg;
  if (message === "photo") {
    bot.sendPhoto(chatId, `https://picsum.photos/200/300?t=${Date.now()}`);
  } else bot.sendMessage(chatId, `Вы написали "${message}"`);
});
