import { Request, Response } from "express";
import ShortLinkerService from "../services/ShortLinkerService";

const shortLinkerService = new ShortLinkerService();

const createShortLink = async (req: Request, res: Response) => {
  const {
    body: { link: url },
  } = req;
  const response = await shortLinkerService.createShortLink(url);
  res.status(200).json({ shortedLink: response });
};

const getUrlByShortLink = async (req: Request, res: Response) => {
  const { url: shortLink } = req;
  const response = await shortLinkerService.getUrlByShortLink(shortLink);
  if (response) {
    res.redirect(response.url);
  } else res.status(404).json({ err: "Sorry, no such short link founded." });
};

export { createShortLink, getUrlByShortLink };
