"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const MonobankService_1 = __importDefault(require("./services/MonobankService"));
const PrivatbankService_1 = __importDefault(require("./services/PrivatbankService"));
const OpenweatherService_1 = __importDefault(require("./services/OpenweatherService"));
const dotenv = __importStar(require("dotenv"));
const express = __importStar(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
dotenv.config();
const app = express.default();
const server = http.createServer(app);
const io = new socketio.Server(server);
server.listen(4004, () => {
    console.log("Running at localhost:4004");
});
io.on(`/${process.env.TELEGRAM_BOT_TOKEN}`, (req) => {
    bot.processUpdate(req.body);
});
const bot = new node_telegram_bot_api_1.default(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true,
});
const openweatherService = new OpenweatherService_1.default();
const privatbankService = new PrivatbankService_1.default();
const monobankService = new MonobankService_1.default();
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
const startMenu = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.sendMessage(chatId, "Погода в Днепре: ", openweather);
    yield bot.sendMessage(chatId, "Курс валют", exchangeRate);
});
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
    if (msg.text === "погода")
        startMenu(chatId);
});
bot.on("callback_query", (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = (_a = query.message) === null || _a === void 0 ? void 0 : _a.chat.id;
    switch (query.data) {
        case "3": {
            yield bot.sendMessage(chatId, yield openweatherService.getWeatherForecastThreeHours());
            startMenu(chatId);
            break;
        }
        case "6": {
            yield bot.sendMessage(chatId, yield openweatherService.getWeatherForecastSixHours());
            startMenu(chatId);
            break;
        }
        case "usd": {
            yield usdExchangeRate(chatId);
            startMenu(chatId);
            break;
        }
        case "eur": {
            yield eurExchangeRate(chatId);
            startMenu(chatId);
            break;
        }
    }
}));
