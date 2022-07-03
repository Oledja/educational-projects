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
const privatbankClient_1 = __importDefault(require("../clients/privatbankClient"));
var CurrencyName;
(function (CurrencyName) {
    CurrencyName["usd"] = "USD";
    CurrencyName["eur"] = "EUR";
})(CurrencyName || (CurrencyName = {}));
class PrivatBankService {
    constructor() {
        this.privatbank = new privatbankClient_1.default();
    }
    getCurrency(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentCurrency = yield this.privatbank.getCurrentExchangeRate();
            return currentCurrency.filter(currency => currency.ccy === name)[0];
        });
    }
    getExchangeRateUsd() {
        return __awaiter(this, void 0, void 0, function* () {
            const usd = yield this.getCurrency(CurrencyName.usd);
            return `Privatbank:💵 ${Number(usd.buy).toFixed(2)}/${Number(usd.sale).toFixed(2)}\n`;
        });
    }
    getExchangeRateEur() {
        return __awaiter(this, void 0, void 0, function* () {
            const eur = yield this.getCurrency(CurrencyName.eur);
            return `Privatbank:💶 ${Number(eur.buy).toFixed(2)}/${Number(eur.sale).toFixed(2)}\n`;
        });
    }
}
exports.default = PrivatBankService;
