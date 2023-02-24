import { Request, Response } from "express";
import ShortLinkerService from "../services/ShortLinkerService";
import getErrorMessage from "../utils/getErrorMessage";

const shortLinkerService = new ShortLinkerService();

const createShortLink = async (req: Request, res: Response) => {
  try {
    const {
      body: { link: url },
    } = req;
    const response = await shortLinkerService.createShortLink(url);
    res.status(200).json({ shortedLink: response });
  } catch (err) {
    res.status(500).json(getErrorMessage(err));
  }
};

const getUrlByShortLink = async (req: Request, res: Response) => {
  try {
    const { url: shortLink } = req;
    const { url } = await shortLinkerService.getUrlByShortLink(shortLink);
    if (url) {
      res.redirect(url);
    } else throw new Error();
  } catch (err) {
    res.status(500).json({ err: "Sorry, no such short link founded." });
  }
};

export { createShortLink, getUrlByShortLink };
