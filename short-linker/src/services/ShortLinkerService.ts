import ShortLinkerRepository from "../repositories/ShortLinkerRepository";
import ShortLinkerResponse from "../types/ShortLinkerResponse";
import { generateShortLink } from "../utill/utill";

class ShortLinkerService {
  shortLinkerRepository = new ShortLinkerRepository();
  baseUrl: string = "localhost:5000";

  public async getUrlByShortLink(
    shortLink: string
  ): Promise<ShortLinkerResponse | undefined> {
    const result = await this.shortLinkerRepository.getUrlByShortLink(
      shortLink
    );
    return result[0];
  }

  public async createShortLink(url: string): Promise<string> {
    const shortLink = generateShortLink();
    this.shortLinkerRepository.save(shortLink, url);
    return this.baseUrl + shortLink;
  }
}

export default ShortLinkerService;
