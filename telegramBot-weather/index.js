process.env.NTBA_FIX_319 = 1;
const https = require('https');
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
https.createServer().listen(process.env.PORT || port).on('request', function(req, res){
    res.end('')
  });
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;
const {showWeatherSixHoursInterval, showWeatherThreeHoursInterval} = require("./services/weatherService")

const token = "5452967029:AAEMGGNUJaeV13nEnIbe3l35zfamvH9NGO0";
const bot = new TelegramBot(token, {polling: true});

const weather = {
    reply_markup: {
        inline_keyboard: [
            [{text: "С интервалом 3 часа", callback_data: "3"}],
            [{text: "С интервалом 6 часов", callback_data: "6"}]
        ]
    }
}
 
bot.on("message", msg => {
    try {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Погода в Днепре", weather);
    } catch (err) {
        console.log(err);
    }
})

bot.on("callback_query", async query => {
    const chatId = query.message.chat.id;
    if (query.data === "3") {
        await bot.sendMessage(chatId, await showWeatherThreeHoursInterval());
        await bot.sendMessage(chatId, "Погода в Днепре", weather);

    } else if (query.data === "6") {
        await bot.sendMessage(chatId, await showWeatherSixHoursInterval());
        await bot.sendMessage(chatId, "Погода в Днепре", weather);
    }
})
