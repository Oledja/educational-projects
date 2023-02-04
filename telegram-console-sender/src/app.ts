import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TOKEN = process.env.TELEGRAM_TOKEN;
const program = new Command().version("0.0.1");
const bot = new TelegramBot(TOKEN, { polling: true });

program
  .command("message")
  .description("Send message to Telegram Bot")
  .argument("<string>")
  .alias("m")
  .action(async (msg: string) => {
    try {
      await bot.sendMessage(CHAT_ID, msg);
      process.exit();
    } catch (err) {
      console.log(err);
    }
  });

program
  .command("photo")
  .description("Send photo to Telegram Bot")
  .argument("path")
  .alias("p")
  .action(async (path: string) => {
    await bot.sendPhoto(CHAT_ID, path);
    process.exit();
  });

program.parse(process.argv);
