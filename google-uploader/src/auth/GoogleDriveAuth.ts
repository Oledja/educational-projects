import { OAuth2Client, Credentials } from "google-auth-library";
import { google } from "googleapis";
import path from "path";
import { saveTokens, getTokens } from "../utill/util";
import * as readline from "readline";
import * as dotenv from "dotenv";
dotenv.config();

const TOKENS_PATH: string = path.dirname(__dirname) + "\\tokens.txt";
const SCOPES: string[] = [process.env.SCOPES];
const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const refreshToken = () => {
  oAuth2Client.on("tokens", (tokens) => {
    try {
      const savedCredentials = getTokens(TOKENS_PATH);
      const credentials: Credentials = tokens;
      savedCredentials.access_token = credentials.access_token;
      savedCredentials.expiry_date = credentials.expiry_date;
      saveTokens(TOKENS_PATH, savedCredentials);
    } catch (err) {}
  });
};
const authenticate = (): OAuth2Client | undefined => {
  try {
    const tokens: Credentials = getTokens(TOKENS_PATH);
    oAuth2Client.setCredentials(tokens);
    return oAuth2Client;
  } catch (err) {
    console.log("To continue you need to register");
  }
};

const authorization = async (): Promise<OAuth2Client> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const url: string = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  return new Promise((resolve) => {
    console.log(url);
    rl.question("Provide Key generated on web page ", async (answer) => {
      rl.close();
      const { tokens: tokens } = await oAuth2Client.getToken(answer);
      oAuth2Client.setCredentials(tokens);
      saveTokens(TOKENS_PATH, tokens);
      resolve(oAuth2Client);
    });
  });
};

const getAuth = async () => {
  refreshToken();
  const auth = authenticate();
  if (auth) return auth;
  return await authorization();
};

export default getAuth;
