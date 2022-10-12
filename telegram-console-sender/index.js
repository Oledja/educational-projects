process.env.NTBA_FIX_319 = 1;
const { program } = require("commander");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();
program.version("0.0.1");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

program
  .command("message")
  .description("Send message to Telegram Bot")
  .argument("<string>")
  .alias("m")
  .action(async (name) => {
    try {
      await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, name);
      process.exit();
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .command("photo")
  .description("Send photo to Telegram Bot")
  .argument("path")
  .alias("p")
  .action(async (path) => {
    await bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, path);
    process.exit();
  });

program.parse(process.argv);
