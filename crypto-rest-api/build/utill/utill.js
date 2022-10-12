"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAveragePrice = exports.formatDate = exports.getFilterTime = void 0;
const Time_1 = __importDefault(require("../enums/Time"));
const getFilterTime = (filterTime) => {
    switch (filterTime) {
        case "FIFTY_MINUTES":
            return Time_1.default.FIFTY_MINUTES;
        case "ONE_HOUR":
            return Time_1.default.ONE_HOUR;
        case "FOUR_HOURS":
            return Time_1.default.FOUR_HOURS;
        default:
            return Time_1.default.DAY;
    }
};
exports.getFilterTime = getFilterTime;
const padTo2Digits = (num) => num.toString().padStart(2, "0");
const formatDate = (date) => `${[
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
].join("-")} ${[
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
].join(":")}`;
exports.formatDate = formatDate;
const getAveragePrice = (currencies) => {
    const avg = currencies
        .map((currency) => currency.price)
        .reduce((price1, price2) => price1 + price2) / currencies.length;
    return +avg.toFixed(2);
};
exports.getAveragePrice = getAveragePrice;
