import { Credentials, OAuth2Client } from "google-auth-library";
import * as readline from 'readline';
import path from 'path';
import { saveTokens, getTokens } from "./util";

export default class Client {
    private FILE_PATH: string = path.dirname(__dirname) + "\\src\\keys\\tokens.txt";
    private SCOPES: string[] = ["https://www.googleapis.com/auth/drive"];
    private oAuth2Client: OAuth2Client;

    constructor(auth: OAuth2Client) {
        this.oAuth2Client = auth;
    }

    private refreshToken() {
        this.oAuth2Client.on('tokens', (tokens) => {    
            if (tokens) {
                try {
                    const tokenFromFile: Credentials = JSON.parse(getTokens(this.FILE_PATH));
                    tokenFromFile.access_token = tokens.access_token;
                    tokenFromFile.expiry_date = tokens.expiry_date;
                    saveTokens(this.FILE_PATH, tokenFromFile);
                } catch (err) {
                }
            }
        });
        
    }
    private authenticate(): OAuth2Client | undefined {
        try {
            const tokens: Credentials = JSON.parse(getTokens(this.FILE_PATH));
            this.oAuth2Client.setCredentials(tokens);
            return this.oAuth2Client;
        } catch (err) {
            console.log("To continue you need to register");
        }
    }
    
    private authorize(): Promise<OAuth2Client> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        const url: string = this.oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: this.SCOPES
        });
        return new Promise((resolve, rejects) =>{
            console.log(url);
            rl.question('Provide Key generated on web page ', async (answer) => {
                rl.close();
                try {
                    const token = await this.oAuth2Client.getToken(answer);
                    this.oAuth2Client.setCredentials(token.tokens);
                    saveTokens(this.FILE_PATH, token.tokens);
                    resolve(this.oAuth2Client);
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(`Error: ${err.message}`);
                    }
                }
            });
        })
    }


    
    public async getAuth() {
        this.refreshToken();
        let auth: OAuth2Client | undefined = this.authenticate();
        if (auth) {
            return auth;
        } else {
            return this.authorize();
        }
    }
}