import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import fs from "fs";

export default class Service {
    private auth: OAuth2Client;
    
    constructor(auth: OAuth2Client) {
        this.auth = auth;
    } 
    
    public async saveImage(path: string, fileName: string) {
        const drive = this.getDrive()
        try {
            return await drive.files.create({
                requestBody: {
                    parents: ["1hYXI4w3hceW-fyvT2ger6vzKZgKh_4wp"],
                        name: fileName,
                        mimeType: "image/json",
                    },
                    media: {
                        mimeType: "image/json",
                        body: fs.createReadStream(path)
                    },
            });
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    }

    public async getImage(imageId: string) {
        const drive = this.getDrive();
        return await drive.files.get({
            fileId: imageId,
            fields: "webViewLink"
        });
    }

    private getDrive() {
        return google.drive({
            version: "v3",
            auth: this.auth
        })
    }
}