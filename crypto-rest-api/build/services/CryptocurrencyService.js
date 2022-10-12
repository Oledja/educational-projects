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
const CryptocurrencyRepository_1 = __importDefault(require("../repositories/CryptocurrencyRepository"));
const Cryptocurrencies_1 = __importDefault(require("../utill/Cryptocurrencies"));
const utill_1 = require("../utill/utill");
class CryptocurrencyService {
    constructor() {
        this.cryptocurrencyRepository = new CryptocurrencyRepository_1.default();
    }
    saveCryptocurrencyRate(clients) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Promise.all(clients.map((client) => client.getCryptocurrencyRate()));
            const flatResult = result.flat(1);
            yield Promise.all(flatResult.map((currency) => this.cryptocurrencyRepository.save(currency)));
        });
    }
    getAveragePriceBySymbolAndTime(symbol, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const period = new Date(new Date().getTime() - time);
            const currencies = yield this.cryptocurrencyRepository.getCurrenciesBySymbol(symbol, period);
            const filteredCurrencies = currencies.filter((currency) => currency.symbol === symbol);
            const averagePrice = (0, utill_1.getAveragePrice)(filteredCurrencies);
            return {
                averagePrice,
                createdAt: new Date(),
                name: Cryptocurrencies_1.default.get(symbol),
                market: "All  markets",
                symbol,
            };
        });
    }
    getAveragePriceBySymbolAndMarketAndTime(symbol, market, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const period = new Date(new Date().getTime() - time);
            const currencies = yield this.cryptocurrencyRepository.getAveragePriceBySymbolAndMarketAndTime(symbol, market, period);
            return currencies.filter((currency) => currency.symbol === symbol && currency.market === market);
        });
    }
}
exports.default = CryptocurrencyService;
