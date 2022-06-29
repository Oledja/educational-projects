process.env.NTBA_FIX_319 = 1;
const { program } = require('commander');
const TelegramBot = require('node-telegram-bot-api');

const token = "5452967029:AAEMGGNUJaeV13nEnIbe3l35zfamvH9NGO0";
const chatID = 432580874;
const bot = new TelegramBot(token, {polling: true});

program
    .version("0.0.1")

program 
    .command("message")
    .description("Send message to Telegram Bot")
    .argument("<string>")
    .alias("m")
    .action(async function(name) {
        try {
            await bot.sendMessage(chatID, name);
            process.exit();
        } catch (err) {
            console.log(err.message);
        }
    })

program
    .command("photo")
    .description("Send photo to Telegram Bot")
    .argument("path")
    .alias("p")
    .action(async function(path) {
        await bot.sendPhoto(chatID, path);
        process.exit();
    })
    
program.parse(process.argv);