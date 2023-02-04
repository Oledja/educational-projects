import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import GoogleDriveAuth from "../auth/GoogleDriveAuth";
import getAuth from "../auth/GoogleDriveAuth";
import { AuthConfig } from "../interfaces/AuthConfig";

class GoogleDriveClient {
  private tokensPath = process.env.TOKENS_PATH;
  private clientId = process.env.CLIENT_ID;
  private clientSecret = process.env.CLIENT_SECRET;
  private redirectUrl = process.env.REDIRECT_URI;
  private scopes = process.env.SCOPES;

  private config: AuthConfig = {
    tokensPath: this.tokensPath,
    clientId: this.clientId,
    clientSecret: this.clientSecret,
    redirectUrl: this.redirectUrl,
    scopes: [this.scopes],
  };
  private googleDriveAuth = new GoogleDriveAuth(this.config);

  private getAuth = async (): Promise<OAuth2Client> => {
    this.googleDriveAuth.init();
    let auth: OAuth2Client;
    try {
      try {
        auth = this.googleDriveAuth.authenticate();
      } catch (err) {
        this.googleDriveAuth.refreshToken();
        auth = this.googleDriveAuth.authenticate();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      auth = await this.googleDriveAuth.authorization();
    }
    return auth;
  };

  public async getDrive() {
    const auth = await this.getAuth();
    return google.drive({
      version: "v3",
      auth,
    });
  }
}

export default GoogleDriveClient;
