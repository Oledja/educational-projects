import ShortLinkerResponse from "../interfaces/LinkResponse";
import getErrorMessage from "../utils/getErrorMessage";
import { generateShortLink } from "../utils/utill";
import * as dotenv from "dotenv";
import LinkRepository from "../repositories/LinkRepository";

dotenv.config();

const baseUrl = process.env.BASE_URL;

class LinkService {
  linkRepository = new LinkRepository();

  public async getUrlByLink(shortLink: string): Promise<ShortLinkerResponse> {
    try {
      const result = await this.linkRepository.getUrlByLink(shortLink);
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async createLink(url: string): Promise<string> {
    try {
      const shortLink = generateShortLink();
      this.linkRepository.save(shortLink, url);
      return baseUrl + shortLink;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }
}

export default LinkService;
