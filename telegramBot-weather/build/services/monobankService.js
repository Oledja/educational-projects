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
const MonobankClient_1 = __importDefault(require("../clients/MonobankClient"));
const MonoCurrencyCode_1 = __importDefault(require("../enums/MonoCurrencyCode"));
const monobank = new MonobankClient_1.default();
let currentCurrency;
class MonobankService {
    getExchangeRateUsd() {
        return __awaiter(this, void 0, void 0, function* () {
            const usd = yield getCurrency(MonoCurrencyCode_1.default.usd);
            return `Monobank:💵 ${usd.rateBuy.toFixed(2)}/${usd.rateSell.toFixed(2)}`;
        });
    }
    getExchangeRateEur() {
        return __awaiter(this, void 0, void 0, function* () {
            const eur = yield getCurrency(MonoCurrencyCode_1.default.eur);
            return `Monobank:💶 ${eur.rateBuy.toFixed(2)}/${eur.rateSell.toFixed(2)}`;
        });
    }
}
const getCurrency = (code) => __awaiter(void 0, void 0, void 0, function* () {
    yield updateExchangeRate();
    return currentCurrency.filter((currency) => currency.currencyCodeA === code)[0];
});
const updateExchangeRate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        currentCurrency = yield monobank.getCurrentExchangeRate();
    }
    catch (err) {
        console.log("timeout");
    }
});
exports.default = MonobankService;
