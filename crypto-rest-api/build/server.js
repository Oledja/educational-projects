"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CronJob_1 = __importDefault(require("./CronJob"));
const CryptocurrencyRouter_1 = __importDefault(require("./routes/CryptocurrencyRouter"));
const app = (0, express_1.default)();
app.use("/cryptocurrency", CryptocurrencyRouter_1.default);
app.listen(process.env.PORT || 5000, () => {
    CronJob_1.default.start();
});
