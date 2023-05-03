import { Router } from "express";
import { FolderController } from "../controllers/FolderController";
import { auth } from "../middlewares/auth";
import multer from "multer";

const storage = multer.memoryStorage();
const multipleUpload = multer({ storage });

const folderRouter = Router();
const folderController = new FolderController();

folderRouter.get("/folders/:id", auth, folderController.getFolder);
folderRouter.get(
  "/folders/photographers/:id",
  auth,
  folderController.getPhotographerFolders
);
folderRouter.post("/folders", auth, folderController.createFolder);
folderRouter.post(
  "/folders/photos/:id",
  multipleUpload.any(),
  auth,
  folderController.addPhotos
);
folderRouter.put("/folders/:id", auth, folderController.updateFolder);
folderRouter.delete("/folders/:id", auth, folderController.deleteFolder);
folderRouter.delete("/folders/photos/:id", auth, folderController.deletePhoto);

export { folderRouter };
