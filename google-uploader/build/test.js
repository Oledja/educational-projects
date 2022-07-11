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
const axios_1 = __importDefault(require("axios"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, axios_1.default)({
            url: `https://api.tinyurl.com/create/`,
            method: `post`,
            headers: {
                Authorization: `Bearer BHdidZcolR3BGHcFK0cQh8IwxSPwkGNFkMnR6w2Mf9VMh5O3e0zxWOcoeKTJ`,
            },
            data: {
                url: `https://drive.google.com/file/d/1XwE_7a7HB9DPr_o4lskyp7KkfnYr5l_d/view?usp=sharing`,
            }
        });
        console.log(res);
    });
}
run();
