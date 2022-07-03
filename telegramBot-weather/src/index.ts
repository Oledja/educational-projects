import TelegramBot from "node-telegram-bot-api";
import config from "./config/config";
import MonobankService from "./services/monobankService";
import PrivatbankService from "./services/privatbankService";
import OpenweatherService from "./services/openweatherService";
import { channel } from "diagnostics_channel";

const bot: TelegramBot = new TelegramBot(config.telegramBot.token, {polling: true});
const openweatherService: OpenweatherService = new OpenweatherService();
const privatbankService: PrivatbankService = new PrivatbankService();
const monobankService: MonobankService = new MonobankService();

const openweather = {
    reply_markup: {
        inline_keyboard: [
            [{text: "С интервалом 3 часа", callback_data: "3"},
            {text: "С интервалом 6 часов", callback_data: "6"}]
        ]
    }
}

const exchangeRate = {
    reply_markup: {
        inline_keyboard: [
            [{text: "USD", callback_data: "usd"},
            {text: "EUR", callback_data: "eur"}]
        ]
    }
}

const startMenu = (chatId: number) => {
    bot.sendMessage(chatId, "Погода в Днепре: ", openweather);
    bot.sendMessage(chatId, "Курс валют", exchangeRate);
}

const usdExchangeRate = async (chatId: number) => {
    await bot.sendMessage(chatId, await monobankService.getExchangeRateUsd());
    await bot.sendMessage(chatId, await privatbankService.getExchangeRateUsd());
}

const eurExchangeRate = async (chatId: number) => {
    await bot.sendMessage(chatId, await monobankService.getExchangeRateEur());
    await bot.sendMessage(chatId, await privatbankService.getExchangeRateEur());
}

bot.on("message", (msg) => {
    const chatId: number = msg.chat.id;
    startMenu(chatId);
})

bot.on("callback_query", async (query) => {
    const chatId: number | undefined = query.message?.chat.id;
    if (chatId) {
        try {
            if (query.data === "3") {
                await bot.sendMessage(chatId, await openweatherService.getWeatherForecastThreeHours());
                startMenu(chatId);
            } else if (query.data === "6") {
                await bot.sendMessage(chatId, await openweatherService.getWeatherForecastSixHours());
                startMenu(chatId);
            } else if (query.data === "usd") {
                await usdExchangeRate(chatId);
                startMenu(chatId);
            } else if (query.data === "eur") {
                await eurExchangeRate(chatId);
                startMenu(chatId);
            }
        } catch (err) {
            if (err instanceof Error)
            console.log(err.message);
        }
    }
})