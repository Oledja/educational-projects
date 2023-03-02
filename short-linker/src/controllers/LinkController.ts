import { Request, Response } from "express";
import LinkService from "../services/LinkService";
import getErrorMessage from "../utils/getErrorMessage";

class LinkController {
  private linkService = new LinkService();

  createShortLink = async (req: Request, res: Response) => {
    try {
      const {
        body: { link: url },
      } = req;
      const response = await this.linkService.createLink(url);
      res.status(200).json({ shortedLink: response });
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getUrlByLink = async (req: Request, res: Response) => {
    try {
      const { url: shortLink } = req;
      const { url } = await this.linkService.getUrlByLink(shortLink);
      if (url) {
        res.redirect(url);
      } else throw new Error();
    } catch (err) {
      res.status(500).json({ err: "Sorry, no such short link founded." });
    }
  };
}

export default LinkController;
