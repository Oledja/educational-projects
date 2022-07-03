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
const monobankClient_1 = __importDefault(require("../clients/monobankClient"));
var CurrencyCode;
(function (CurrencyCode) {
    CurrencyCode[CurrencyCode["usd"] = 840] = "usd";
    CurrencyCode[CurrencyCode["eur"] = 978] = "eur";
})(CurrencyCode || (CurrencyCode = {}));
class MonobankService {
    constructor() {
        this.monobank = new monobankClient_1.default();
    }
    updateExchangeRate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.currentCurrency = yield this.monobank.getCurrentExchangeRate();
            }
            catch (err) {
                console.log("timeout");
            }
        });
    }
    getCurrency(code) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateExchangeRate();
            return this.currentCurrency
                .filter(currency => currency.currencyCodeA === code)[0];
        });
    }
    getExchangeRateUsd() {
        return __awaiter(this, void 0, void 0, function* () {
            const usd = yield this.getCurrency(CurrencyCode.usd);
            return `Monobank:💵 ${usd.rateBuy.toFixed(2)}/${usd.rateSell.toFixed(2)}`;
        });
    }
    getExchangeRateEur() {
        return __awaiter(this, void 0, void 0, function* () {
            const eur = yield this.getCurrency(CurrencyCode.eur);
            return `Monobank:💶 ${eur.rateBuy.toFixed(2)}/${eur.rateSell.toFixed(2)}`;
        });
    }
}
exports.default = MonobankService;
