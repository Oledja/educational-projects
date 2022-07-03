"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const config_1 = __importDefault(require("./config/config"));
const monobankService_1 = __importDefault(require("./services/monobankService"));
const privatbankService_1 = __importDefault(require("./services/privatbankService"));
const openweatherService_1 = __importDefault(require("./services/openweatherService"));
const bot = new node_telegram_bot_api_1.default(config_1.default.telegramBot.token, { polling: true });
const openweatherService = new openweatherService_1.default();
const privatbankService = new privatbankService_1.default();
const monobankService = new monobankService_1.default();
const openweather = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "С интервалом 3 часа", callback_data: "3" },
                { text: "С интервалом 6 часов", callback_data: "6" }]
        ]
    }
};
const exchangeRate = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "USD", callback_data: "usd" },
                { text: "EUR", callback_data: "eur" }]
        ]
    }
};
const startMenu = (chatId) => {
    bot.sendMessage(chatId, "Погода в Днепре: ", openweather);
    bot.sendMessage(chatId, "Курс валют", exchangeRate);
};
const usdExchangeRate = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.sendMessage(chatId, yield monobankService.getExchangeRateUsd());
    yield bot.sendMessage(chatId, yield privatbankService.getExchangeRateUsd());
});
const eurExchangeRate = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.sendMessage(chatId, yield monobankService.getExchangeRateEur());
    yield bot.sendMessage(chatId, yield privatbankService.getExchangeRateEur());
});
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    startMenu(chatId);
});
bot.on("callback_query", (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = (_a = query.message) === null || _a === void 0 ? void 0 : _a.chat.id;
    if (chatId) {
        try {
            if (query.data === "3") {
                yield bot.sendMessage(chatId, yield openweatherService.getWeatherForecastThreeHours());
                startMenu(chatId);
            }
            else if (query.data === "6") {
                yield bot.sendMessage(chatId, yield openweatherService.getWeatherForecastSixHours());
                startMenu(chatId);
            }
            else if (query.data === "usd") {
                yield usdExchangeRate(chatId);
                startMenu(chatId);
            }
            else if (query.data === "eur") {
                yield eurExchangeRate(chatId);
                startMenu(chatId);
            }
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
        }
    }
}));
