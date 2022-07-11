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
const readline = __importStar(require("readline"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
class Client {
    constructor(auth) {
        this.FILE_PATH = path_1.default.dirname(__dirname) + "\\src\\keys\\tokens.txt";
        this.SCOPES = ["https://www.googleapis.com/auth/drive"];
        this.oAuth2Client = auth;
    }
    refreshToken() {
        this.oAuth2Client.on('tokens', (tokens) => {
            if (tokens) {
                try {
                    const tokenFromFile = JSON.parse((0, util_1.getTokens)(this.FILE_PATH));
                    tokenFromFile.access_token = tokens.access_token;
                    tokenFromFile.expiry_date = tokens.expiry_date;
                    (0, util_1.saveTokens)(this.FILE_PATH, tokenFromFile);
                }
                catch (err) {
                }
            }
        });
    }
    authenticate() {
        try {
            const tokens = JSON.parse((0, util_1.getTokens)(this.FILE_PATH));
            this.oAuth2Client.setCredentials(tokens);
            return this.oAuth2Client;
        }
        catch (err) {
            console.log("To continue you need to register");
        }
    }
    authorize() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const url = this.oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: this.SCOPES
        });
        return new Promise((resolve, rejects) => {
            console.log(url);
            rl.question('Provide Key generated on web page ', (answer) => __awaiter(this, void 0, void 0, function* () {
                rl.close();
                try {
                    const token = yield this.oAuth2Client.getToken(answer);
                    this.oAuth2Client.setCredentials(token.tokens);
                    (0, util_1.saveTokens)(this.FILE_PATH, token.tokens);
                    resolve(this.oAuth2Client);
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log(`Error: ${err.message}`);
                    }
                }
            }));
        });
    }
    getAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            this.refreshToken();
            let auth = this.authenticate();
            if (auth) {
                return auth;
            }
            else {
                return this.authorize();
            }
        });
    }
}
exports.default = Client;
