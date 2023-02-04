import { readFileSync, writeFileSync } from "fs";
import path from "path";
import axios from "axios";
import { Credentials } from "google-auth-library";
import * as dotenv from "dotenv";

dotenv.config();

const SHORT_LINK_URL = process.env.SHORT_LINK_URL;
const SHORT_LINK_API_KEY = process.env.SHORT_LINK_API_KEY;

const saveTokens = (filePath: string, tokens: Credentials) => {
  try {
    const tokensToSave = JSON.stringify(tokens);
    writeFileSync(filePath, tokensToSave);
  } catch (err) {
    throw new Error("Tokens was not saved");
  }
};

const getTokens = (filePath: string): Credentials => {
  try {
    const tokens = readFileSync(filePath, "utf-8");
    const credentials: Credentials = JSON.parse(tokens);
    return credentials;
  } catch (err) {
    throw new Error("Tokens not found");
  }
};

const getImageName = (imagePath: string) => {
  const { name: imageName } = path.parse(imagePath);
  return imageName;
};

const getShortLink = async (link: string): Promise<string> => {
  try {
    const {
      data: {
        data: { tiny_url: shortLink },
      },
    } = await axios({
      url: SHORT_LINK_URL,
      method: `post`,
      headers: {
        Authorization: `Bearer ${SHORT_LINK_API_KEY}`,
      },
      data: {
        url: link,
      },
    });
    return shortLink;
  } catch (err) {
    throw new Error("Short link was not created");
  }
};

export { saveTokens, getTokens, getImageName, getShortLink };
