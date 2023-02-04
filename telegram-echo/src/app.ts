import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TELEGRAM_TOKEN;
const IMAGE_URL = process.env.IMAGE_URL;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const { text: message } = msg;
  const {
    chat: { id: chatId },
  } = msg;
  if (message?.trim().toUpperCase() === "PHOTO") {
    bot.sendPhoto(chatId, IMAGE_URL + Date.now());
  } else bot.sendMessage(chatId, `Вы написали "${message}"`);
});
