process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;
const { updateImage } = require("./util");

const token = "5452967029:AAEMGGNUJaeV13nEnIbe3l35zfamvH9NGO0";
const bot = new TelegramBot(token, {polling: true});


bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "photo") {
        updateImage();
        await bot.sendPhoto(chatId,__dirname + "/image.jpg");
    } else {
        bot.sendMessage(chatId, `Вы написали "${text}"`);
    }
})

