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
const inquirer_1 = __importDefault(require("inquirer"));
const client_1 = __importDefault(require("./client"));
const credentials_1 = __importDefault(require("./keys/credentials"));
const service_1 = __importDefault(require("./service"));
const util_1 = require("./util");
const oAuth2Client = new googleapis_1.google.auth.OAuth2(credentials_1.default.client_id, credentials_1.default.client_secret, credentials_1.default.redirect_uri);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new client_1.default(oAuth2Client);
        const auth = yield client.getAuth();
        const driveService = new service_1.default(auth);
        const imagePath = yield inquirer_1.default.prompt([
            {
                name: "path",
                message: "Drag and drop image to terminal and press Enter for upload: ",
                type: "text",
            }
        ]);
        let imageName = (0, util_1.getImageName)(imagePath.path);
        const changeName = yield inquirer_1.default.prompt([
            {
                name: "changeName",
                message: `current image name "${imageName}" \nDo you want change it?`,
                type: "list",
                choices: ["yes", "no"]
            },
            {
                name: "newName",
                message: "Enter new name ",
                type: "text",
                when: function (answers) {
                    return answers.changeName === "yes";
                }
            }
        ]);
        if (changeName.changeName === "yes") {
            imageName = changeName.newName;
        }
        const result = yield driveService.saveImage(imagePath.path, imageName);
        const isShortLink = yield inquirer_1.default.prompt({
            name: "shortLink",
            message: `Would you like to shortem you link?`,
            type: "list",
            choices: ["yes", "no"]
        });
        if (isShortLink.shortLink === "yes") {
            const imageId = result === null || result === void 0 ? void 0 : result.data.id;
            if (imageId) {
                const link = (yield driveService.getImage(imageId)).data.webViewLink;
                if (link) {
                    const shortLink = (yield (0, util_1.getShortLink)(link)).data.tiny_url;
                    console.log(`Your short link is ${shortLink}`);
                }
            }
        }
    });
}
main();
