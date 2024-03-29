import TelegramBot from "node-telegram-bot-api";
import MonobankService from "./services/MonobankService";
import PrivatbankService from "./services/PrivatbankService";
import OpenweatherService from "./services/OpenweatherService";
import * as dotenv from "dotenv";
import Query from "./interfaces/Query";

dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot: TelegramBot = new TelegramBot(TOKEN, {
  polling: true,
});
const openweatherService: OpenweatherService = new OpenweatherService();
const privatbankService: PrivatbankService = new PrivatbankService();
const monobankService: MonobankService = new MonobankService();

const openweather = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "С интервалом 3 часа", callback_data: "3" }],
      [{ text: "С интервалом 6 часов", callback_data: "6" }],
    ],
  },
};

const exchangeRate = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "USD", callback_data: "usd" },
        { text: "EUR", callback_data: "eur" },
      ],
    ],
  },
};

const startMenu = async (chatId: number) => {
  await bot.sendMessage(chatId, "Погода в Днепре: ", openweather);
  await bot.sendMessage(chatId, "Курс валют", exchangeRate);
};

const usdExchangeRate = async (chatId: number) => {
  await bot.sendMessage(chatId, await monobankService.getExchangeRateUsd());
  await bot.sendMessage(chatId, await privatbankService.getExchangeRateUsd());
};

const eurExchangeRate = async (chatId: number) => {
  await bot.sendMessage(chatId, await monobankService.getExchangeRateEur());
  await bot.sendMessage(chatId, await privatbankService.getExchangeRateEur());
};
bot.on("message", (msg) => {
  const {
    chat: { id: chatId },
  } = msg;
  const { text: message } = msg;
  if (message?.trim().toUpperCase() === "ПОГОДА") startMenu(chatId);
});

bot.on("callback_query", async (query) => {
  const {
    chat: { id: chatId },
  } = query.message as Query["message"];
  switch (query.data) {
    case "3": {
      await bot.sendMessage(
        chatId,
        await openweatherService.getWeatherForecastThreeHours()
      );
      startMenu(chatId);
      break;
    }
    case "6": {
      await bot.sendMessage(
        chatId,
        await openweatherService.getWeatherForecastSixHours()
      );
      startMenu(chatId);
      break;
    }
    case "usd": {
      await usdExchangeRate(chatId);
      startMenu(chatId);
      break;
    }
    case "eur": {
      await eurExchangeRate(chatId);
      startMenu(chatId);
      break;
    }
  }
});
