import * as fs from "fs";
import path from "path";
import axios from "axios";
import { Credentials } from "google-auth-library";
import * as dotenv from "dotenv";
dotenv.config();

const saveTokens = (filePath: string, tokens: Credentials) => {
  fs.writeFileSync(filePath, JSON.stringify(tokens));
};

const getTokens = (filePath: string): Credentials => {
  const credentials: Credentials = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );
  return credentials;
};

const getImageName = (imagePath: string): string => {
  const { name: imageName } = path.parse(imagePath);
  return imageName;
};

const getShortLink = async (link: string): Promise<string> => {
  const {
    data: {
      data: { tiny_url: shortLink },
    },
  } = await axios({
    url: `https://api.tinyurl.com/create/`,
    method: `post`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    data: {
      url: link,
    },
  });
  return shortLink;
};

export { saveTokens, getTokens, getImageName, getShortLink };
