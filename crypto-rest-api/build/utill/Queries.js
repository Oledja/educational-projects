"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECT_BY_NAME_AND_TIME_AND_MARKET = exports.SELECT_BY_NAME_AND_TIME = exports.INSERT = void 0;
const INSERT = "INSERT INTO coins (symbol, name, price, market, createdAt) VALUES (?, ?, ?, ?, ?)";
exports.INSERT = INSERT;
const SELECT_BY_NAME_AND_TIME = "SELECT symbol, name, price, market, createdAt FROM coins WHERE symbol = ? AND createdAt > ?";
exports.SELECT_BY_NAME_AND_TIME = SELECT_BY_NAME_AND_TIME;
const SELECT_BY_NAME_AND_TIME_AND_MARKET = "SELECT symbol, name, price, market, createdAt FROM coins WHERE symbol = ? AND createdAt > ? AND market = ?";
exports.SELECT_BY_NAME_AND_TIME_AND_MARKET = SELECT_BY_NAME_AND_TIME_AND_MARKET;
