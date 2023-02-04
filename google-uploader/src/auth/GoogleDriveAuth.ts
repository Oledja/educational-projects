import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { saveTokens, getTokens } from "../util/util";
import * as readline from "readline";
import * as dotenv from "dotenv";
import { AuthConfig } from "../interfaces/AuthConfig";

dotenv.config();

class GoogleDriveAuth {
  private tokensPath: string;
  private clientId: string;
  private clientSecret: string;
  private redirectUrl: string;
  private scopes: string[];

  constructor(config: AuthConfig) {
    this.tokensPath = config.tokensPath;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUrl = config.redirectUrl;
    this.scopes = config.scopes;
  }

  private oAuth2Client: OAuth2Client;

  init = () => {
    this.oAuth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUrl
    );
  };

  refreshToken = () => {
    this.oAuth2Client.on("tokens", (credentials) => {
      try {
        const savedCredentials = getTokens(this.tokensPath);
        savedCredentials.access_token = credentials.access_token;
        savedCredentials.expiry_date = credentials.expiry_date;
        saveTokens(this.tokensPath, savedCredentials);
      } catch (err) {}
    });
  };

  authenticate = (): OAuth2Client => {
    try {
      const tokens = getTokens(this.tokensPath);
      this.oAuth2Client.setCredentials(tokens);
      return this.oAuth2Client;
    } catch (err) {
      throw new Error(
        "Authentication is failed. To continue you need to register"
      );
    }
  };

  authorization = async (): Promise<OAuth2Client> => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const url = this.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.scopes,
    });
    return new Promise((resolve) => {
      console.log(url);
      rl.question("Provide Key generated on web page ", async (answer) => {
        rl.close();
        const { tokens } = await this.oAuth2Client.getToken(answer);
        this.oAuth2Client.setCredentials(tokens);
        saveTokens(this.tokensPath, tokens);
        resolve(this.oAuth2Client);
      });
    });
  };
}

export default GoogleDriveAuth;
