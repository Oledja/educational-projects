import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

export const sendOTP = async (chatId: number, code: string) => {
  await bot.sendMessage(chatId, code);
};
