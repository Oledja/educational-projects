import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

export const sendCode = async (chatId: number, code: string, phone: string) => {
  const message = `Verification code: ${code} for phone: ${phone}`;
  await bot.sendMessage(chatId, message);
};
