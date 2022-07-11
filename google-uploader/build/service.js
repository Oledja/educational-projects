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
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
class Service {
    constructor(auth) {
        this.auth = auth;
    }
    saveImage(path, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const drive = this.getDrive();
            try {
                return yield drive.files.create({
                    requestBody: {
                        parents: ["1hYXI4w3hceW-fyvT2ger6vzKZgKh_4wp"],
                        name: fileName,
                        mimeType: "image/json",
                    },
                    media: {
                        mimeType: "image/json",
                        body: fs_1.default.createReadStream(path)
                    },
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
            }
        });
    }
    getImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const drive = this.getDrive();
            return yield drive.files.get({
                fileId: imageId,
                fields: "webViewLink"
            });
        });
    }
    getDrive() {
        return googleapis_1.google.drive({
            version: "v3",
            auth: this.auth
        });
    }
}
exports.default = Service;
