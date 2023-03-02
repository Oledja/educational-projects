import { Router } from "express";
import LinkController from "../controllers/LinkController";
import linkMiddleware from "../middlewares/LinkMiddlewares";

const router: Router = Router();
const linkController = new LinkController();

router.post("/shortlinker", linkMiddleware, linkController.createShortLink);
router.get("/:shortLink", linkController.getUrlByLink);

export default router;
