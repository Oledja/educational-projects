import { Router } from "express";
import { auth } from "../middlewares/auth";
import multer from "multer";
import { AlbumController } from "../controllers/AlbumController";

const storage = multer.memoryStorage();
const multipleUpload = multer({ storage });

const albumRouter = Router();
const albumController = new AlbumController();

albumRouter.get("/albums/:id", auth, albumController.getAlbum);
albumRouter.get("/albums", auth, albumController.getPhotographerAlbums);
albumRouter.post("/albums", auth, albumController.createAlbum);
albumRouter.post(
  "/albums/:id/photos",
  multipleUpload.any(),
  auth,
  albumController.addPhotos
);

export { albumRouter };
