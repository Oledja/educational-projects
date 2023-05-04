import { Router } from "express";
import { StoreController } from "../controllers/StoreController";
import { auth } from "../middlewares/auth";

const storeRouter = Router();
const storeController = new StoreController();

storeRouter.post("/store/buy/photos/:photoId", auth, storeController.buyPhoto);
storeRouter.post(
  "/store/buy/folders/:folderId",
  auth,
  storeController.buyFolder
);
storeRouter.get("/store/photos/:photoId/:userId", storeController.unlockPhoto);
storeRouter.get(
  "/store/folders/:folderId/:userId",
  storeController.unlockFolder
);

export { storeRouter };
