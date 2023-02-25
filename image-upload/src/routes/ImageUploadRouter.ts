import { Router } from "express";
import multer from "multer";
import ImageUploadController from "../controllers/ImageUploadController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const upload = multer({ storage: multer.memoryStorage() });

const imageUploadRouter: Router = Router();
const imageUploadController = new ImageUploadController();

imageUploadRouter.post(
  "/create",
  authMiddleware,
  upload.single("file"),
  imageUploadController.uploadImage
);
imageUploadRouter.get(
  "/all-files",
  authMiddleware,
  imageUploadController.getImages
);
imageUploadRouter.delete(
  "/:fileId",
  authMiddleware,
  imageUploadController.deleteImage
);

export { imageUploadRouter };
