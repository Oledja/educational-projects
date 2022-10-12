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
const PrivatbankClient_1 = __importDefault(require("../clients/PrivatbankClient"));
const PrivatCurrencyCode_1 = __importDefault(require("../enums/PrivatCurrencyCode"));
const privatbank = new PrivatbankClient_1.default();
class PrivatBankService {
    getExchangeRateUsd() {
        return __awaiter(this, void 0, void 0, function* () {
            const usd = yield getCurrency(PrivatCurrencyCode_1.default.usd);
            return `Privatbank:💵 ${Number(usd.buy).toFixed(2)}/${parseInt(usd.sale).toFixed(2)}`;
        });
    }
    getExchangeRateEur() {
        return __awaiter(this, void 0, void 0, function* () {
            const eur = yield getCurrency(PrivatCurrencyCode_1.default.eur);
            return `Privatbank:💶 ${Number(eur.buy).toFixed(2)}/${parseInt(eur.sale).toFixed(2)}`;
        });
    }
}
const getCurrency = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const currentCurrency = yield privatbank.getCurrentExchangeRate();
    return currentCurrency.filter((currency) => currency.ccy === name)[0];
});
exports.default = PrivatBankService;
