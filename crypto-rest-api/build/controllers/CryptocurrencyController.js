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
exports.getCoinAverageRate = void 0;
const CryptocurrencyService_1 = __importDefault(require("../services/CryptocurrencyService"));
const utill_1 = require("../utill/utill");
const cryptocurrencyService = new CryptocurrencyService_1.default();
const getCoinAverageRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const timePeriod = req.query.timePeriod;
    const market = req.query.market;
    const time = (0, utill_1.getFilterTime)(timePeriod);
    let response;
    if (market) {
        response =
            yield cryptocurrencyService.getAveragePriceBySymbolAndMarketAndTime(name, market, time);
    }
    else {
        response = yield cryptocurrencyService.getAveragePriceBySymbolAndTime(name, time);
    }
    res.status(200).json(response);
});
exports.getCoinAverageRate = getCoinAverageRate;
