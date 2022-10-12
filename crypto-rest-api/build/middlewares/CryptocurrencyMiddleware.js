"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cryptocurrencies_1 = __importDefault(require("../utill/Cryptocurrencies"));
const Markets_1 = __importDefault(require("../utill/Markets"));
const Time_1 = __importDefault(require("../utill/Time"));
const cryptocurrencyMiddleware = (req, res, next) => {
    try {
        const name = req.query.name;
        const timePeriod = req.query.timePeriod;
        const market = req.query.market;
        if (!Cryptocurrencies_1.default.get(name))
            throw new Error(JSON.stringify({
                error: `Invalid parameter name=${name}`,
                message: `Available values ${Cryptocurrencies_1.default.toString()}`,
            }));
        if (market) {
            if (!Markets_1.default.includes(market))
                throw new Error(JSON.stringify({
                    error: `Invalid parameter market=${market}`,
                    message: `Available values ${Markets_1.default.toString()}`,
                }));
        }
        if (!Time_1.default.includes(timePeriod))
            throw new Error(JSON.stringify({
                error: `Invalid parameter timePeriod=${timePeriod}`,
                message: `Available values ${Time_1.default.toString()}`,
            }));
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
    }
};
exports.default = cryptocurrencyMiddleware;
