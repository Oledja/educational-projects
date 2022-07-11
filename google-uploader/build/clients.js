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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const fs = __importStar(require("fs"));
const googleapis_1 = require("googleapis");
const readline = __importStar(require("readline"));
const path_1 = __importDefault(require("path"));
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = path_1.default.dirname(__dirname) + "\\src\\keys\\token.txt";
function authorize(credentials) {
    let oAuth2Client = new googleapis_1.google.auth.OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uri);
    let tokenFromFile = fs.readFileSync(TOKEN_PATH, "utf-8");
    oAuth2Client.on("tokens", (tokens) => {
        if (tokens.refresh_token) {
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            oAuth2Client.setCredentials({
                refresh_token: tokens.refresh_token
            });
        }
    });
    try {
        const token = JSON.parse(tokenFromFile);
        oAuth2Client.setCredentials(token);
        // oAuth2Client.getTokenInfo(token.access_token);
        return oAuth2Client;
    }
    catch (err) {
        console.log(err);
    }
    oAuth2Client = getNewToken(oAuth2Client);
    return oAuth2Client;
}
exports.authorize = authorize;
function getNewToken(oAuth2Client) {
    console.log("GET NEW TOKEN");
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    console.log("Authorize this app by visiting this url: ", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Provide Key generated on web page ", (code) => __awaiter(this, void 0, void 0, function* () {
        rl.close();
        const token = yield oAuth2Client.getToken(code);
        if (token) {
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token.tokens));
            oAuth2Client.setCredentials(token.tokens);
        }
    }));
    return oAuth2Client;
}
