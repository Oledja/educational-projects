import { Router } from "express";
import { PhotographerController } from "../controllers/PhorographerController";

const photographerRouter = Router();
const photographerController = new PhotographerController();

photographerRouter.post("/signup", photographerController.signUp);
photographerRouter.post("/signin", photographerController.login);

photographerRouter.get(
  "/photographers/:id",
  photographerController.getPhotographer
);
photographerRouter.get(
  "/photographers",
  photographerController.getPhotographers
);

export { photographerRouter };
