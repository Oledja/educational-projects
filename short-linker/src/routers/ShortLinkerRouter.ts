import { Router } from "express";
import {
  createShortLink,
  getUrlByShortLink,
} from "../controllers/ShortLinkController";
import linkerMiddleware from "../middlewares/ShortLinkerMiddlewares";

const router: Router = Router();

router.post("/shortlinker", linkerMiddleware, createShortLink);
router.get("/:shortLink", getUrlByShortLink);

export default router;
