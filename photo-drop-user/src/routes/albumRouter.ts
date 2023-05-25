import { Router } from "express";
import { auth } from "../middlewares/auth";
import { AlbumController } from "../controllers/AlbumController";

const albumRouter = Router();
const albumController = new AlbumController();

albumRouter.get("/albums/:albumId", auth, albumController.getUserAlbum);
albumRouter.get("/albums", auth, albumController.getUserAlbums);

export { albumRouter };
