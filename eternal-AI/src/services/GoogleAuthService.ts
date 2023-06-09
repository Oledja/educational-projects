import { OAuth2Client } from "google-auth-library";
import { getErrorMessage } from "../utils/getErrorMessage";
import { UserGoogleAuthInfo } from "../dto/UserGoogleAuthInfo";

export class GoogleAuthService {
  private oAuth2Client: OAuth2Client;
  private redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.redirectUri = redirectUri;
    this.oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
  }

  getAuthUrl = () => {
    const authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      redirect_uri: this.redirectUri,
      response_type: "code",
      scope: ["profile", "email"],
    });

    return authorizeUrl;
  };

  getUserInfo = async (code: string): Promise<UserGoogleAuthInfo> => {
    try {
      const {
        tokens: { id_token: idToken },
      } = await this.oAuth2Client.getToken(code);
      if (!idToken) throw new Error("Token not provided");
      const info = await this.oAuth2Client.verifyIdToken({ idToken });
      const payload = info.getPayload();
      if (!payload) throw new Error("Payload not specified in token");
      const { email, name } = payload;
      if (!email) throw new Error("Email not specified in payload");
      return { email, name };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
