import { Router } from "express";
import { PhotographerController } from "../controllers/PhorographerController";
import { auth } from "../middlewares/auth";

const photographerRouter = Router();
const photographerController = new PhotographerController();

photographerRouter.put(
  "/photographers/:id",
  auth,
  photographerController.updatePhotographer
);
photographerRouter.delete(
  "/photographers",
  auth,
  photographerController.deletePhotographer
);

export { photographerRouter };
