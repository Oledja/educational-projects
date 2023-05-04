import { Router } from "express";
import { PhotographerController } from "../controllers/PhorographerController";
import { auth } from "../middlewares/auth";

const photographerRouter = Router();
const photographerController = new PhotographerController();

photographerRouter.get(
  "/photographers/:id",
  photographerController.getPhotographer
);
photographerRouter.get(
  "/photographers",
  photographerController.getPhotographers
);
photographerRouter.put(
  "/photographers",
  auth,
  photographerController.updatePhotographer
);
photographerRouter.delete(
  "/photographers/:id",
  photographerController.deletePhotographer
);

export { photographerRouter };
