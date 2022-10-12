"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const utill_1 = require("../utill/utill");
const mysql2_1 = require("mysql2");
const Queries_1 = require("../utill/Queries");
dotenv.config();
class CryptocurrencyRepository {
    constructor() {
        this.pool = (0, mysql2_1.createPool)({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
        });
    }
    save(currency) {
        this.pool.query(Queries_1.INSERT, [
            currency.symbol,
            currency.name,
            currency.price,
            currency.market,
            (0, utill_1.formatDate)(new Date()),
        ]);
    }
    getCurrenciesBySymbol(symbol, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool
                .promise()
                .query(Queries_1.SELECT_BY_NAME_AND_TIME, [symbol, time]);
            return rows;
        });
    }
    getAveragePriceBySymbolAndMarketAndTime(symbol, market, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool
                .promise()
                .query(Queries_1.SELECT_BY_NAME_AND_TIME_AND_MARKET, [
                symbol,
                (0, utill_1.formatDate)(time),
                market,
            ]);
            return rows;
        });
    }
}
exports.default = CryptocurrencyRepository;
