import { Router } from "express";
import { PhotoController } from "../controllers/PhotoController";
import { auth } from "../middlewares/auth";

const photoRouter = Router();
const photoController = new PhotoController();

photoRouter.get("/photos", auth, photoController.getUserPhotos);

export { photoRouter };
