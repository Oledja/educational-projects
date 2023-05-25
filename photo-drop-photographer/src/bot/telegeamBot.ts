import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

export const sendMessage = async (chatId: number, albumId: string) => {
  const message = `PhotoDrop: your photos have dropped 🔥 Check them out here: BASEURL/${albumId}`;
  await bot.sendMessage(chatId, message);
};
