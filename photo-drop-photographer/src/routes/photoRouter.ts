import { Router } from "express";
import { PhotoController } from "../controllers/PhotoController";
import { auth } from "../middlewares/auth";

const photoRouter = Router();
const photoController = new PhotoController();

photoRouter.post("/photos/:id/mark", auth, photoController.markUserOnPhoto);
photoRouter.post("/photos/:id/unmark", auth, photoController.unmarkUserOnPhoto);

export { photoRouter };
