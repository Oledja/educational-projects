import * as fs from "fs";
import path, { ParsedPath } from "path";
import axios from "axios";
import apiKey from "./keys/api-key";

export function saveTokens(filePath: string, tokens: object) {
    fs.writeFileSync(filePath, JSON.stringify(tokens));
}

export function getTokens(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
}

export function getImageName(imagePath: string) {
    const parsedPath: ParsedPath = path.parse(imagePath);
    return parsedPath.name;
}

export async function getShortLink(link: string) {
    const resp = await axios({
        url: `https://api.tinyurl.com/create/`,
      method: `post`,
      headers: {
        Authorization: `Bearer ${apiKey.api_key}`,
      },
      data: {
        url: link
      }
    });
    return resp.data;
}