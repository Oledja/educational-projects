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
const CryptocurrencyService_1 = __importDefault(require("./services/CryptocurrencyService"));
const CoinBaseClient_1 = __importDefault(require("./clients/CoinBaseClient"));
const CoinMarketCapClient_1 = __importDefault(require("./clients/CoinMarketCapClient"));
const CoinPaprikaClient_1 = __importDefault(require("./clients/CoinPaprikaClient"));
const CoinStatsClient_1 = __importDefault(require("./clients/CoinStatsClient"));
const KuCoinClient_1 = __importDefault(require("./clients/KuCoinClient"));
const clients = [
    new CoinBaseClient_1.default(),
    new CoinMarketCapClient_1.default(),
    new CoinPaprikaClient_1.default(),
    new CoinStatsClient_1.default(),
    new KuCoinClient_1.default(),
];
const service = new CryptocurrencyService_1.default();
const f = () => __awaiter(void 0, void 0, void 0, function* () {
    yield service.saveCryptocurrencyRate(clients);
});
f();
