import { Router } from "express";
import { FolderController } from "../controllers/FolderController";
import { auth } from "../middlewares/auth";

const folderRouter = Router();
const folderController = new FolderController();

folderRouter.get("/folders/:folderId", auth, folderController.getUserFolder);
folderRouter.get("/folders", auth, folderController.getUserFolders);

export { folderRouter };
