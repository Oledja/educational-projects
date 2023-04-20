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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.fibonacci = void 0;
const core_1 = __importDefault(require("@middy/core"));
const reqParamValidate_1 = require("./reqParamValidate");
const errorHandler_1 = require("./errorHandler");
const Joi = __importStar(require("joi"));
const schema = Joi.string()
    .min(1)
    .pattern(/^([^0-9]*)$/);
function buildResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: `${JSON.stringify(body)}`,
    };
}
const helloName = async (event) => {
    const { name } = event.queryStringParameters;
    const response = buildResponse(200, `Hello ${name}`);
    return response;
};
async function fibonacci() {
    const f = (n) => {
        if (n === 0)
            return 0;
        if (n === 1)
            return 1;
        return f(n - 2) + f(n - 1);
    };
    const result = [];
    for (let i = 0; i <= 10; i++) {
        result.push(f(i));
    }
    const response = buildResponse(200, result.join(","));
    return response;
}
exports.fibonacci = fibonacci;
exports.hello = (0, core_1.default)(helloName)
    .use((0, reqParamValidate_1.reqParamValidate)(schema))
    .use((0, errorHandler_1.errorHandler)());
