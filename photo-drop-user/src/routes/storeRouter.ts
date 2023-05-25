import { Router } from "express";
import { StoreController } from "../controllers/StoreController";
import { auth } from "../middlewares/auth";

const storeRouter = Router();
const storeController = new StoreController();

storeRouter.post("/store/buy/albums/:albumId", auth, storeController.buyAlbum);
storeRouter.get("/store/albums/:albumId/:userId", storeController.unlockAlbum);

export { storeRouter };
