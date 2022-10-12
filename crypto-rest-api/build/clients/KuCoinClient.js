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
const axios_1 = __importDefault(require("axios"));
const Markets_1 = __importDefault(require("../enums/Markets"));
const Cryptocurrencies_1 = __importDefault(require("../utill/Cryptocurrencies"));
class KuCoinClient {
    constructor() {
        this.API_URL = process.env.KUCOIN_URL;
    }
    getCryptocurrencyRate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { data: result }, } = yield axios_1.default.get(this.API_URL);
            const response = [];
            Object.keys(result).forEach((symbol) => {
                const name = Cryptocurrencies_1.default.get(symbol);
                if (name) {
                    response.push({
                        name,
                        price: +result[symbol],
                        market: Markets_1.default.KU_COIN,
                        createdAt: new Date(),
                        symbol,
                    });
                }
            });
            return response;
        });
    }
}
exports.default = KuCoinClient;
