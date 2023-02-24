import ShortLinkerRepository from "../repositories/ShortLinkerRepository";
import ShortLinkerResponse from "../interfaces/ShortLinkerResponse";
import getErrorMessage from "../utils/getErrorMessage";
import { generateShortLink } from "../utils/utill";
import * as dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;

class ShortLinkerService {
  shortLinkerRepository = new ShortLinkerRepository();

  public async getUrlByShortLink(
    shortLink: string
  ): Promise<ShortLinkerResponse> {
    try {
      const result = await this.shortLinkerRepository.getUrlByShortLink(
        shortLink
      );
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async createShortLink(url: string): Promise<string> {
    try {
      const shortLink = generateShortLink();
      this.shortLinkerRepository.save(shortLink, url);
      return baseUrl + shortLink;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }
}

export default ShortLinkerService;
