import { Router } from "express";
import {
  deleteImage,
  getImages,
  uploadImage,
} from "../controllers/ImageUploadController";
import multer from "multer";
import { signIn, signUp, verify } from "../controllers/AuthController";
import { requestValidator } from "../middlewares/RequestValidator";
import {
  singInSchema,
  singUpSchema,
  verifySchema,
} from "../validations/ValidationScemas";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const upload = multer({ storage: multer.memoryStorage() });

const router: Router = Router();

router.post("/create", authMiddleware, upload.single("file"), uploadImage);
router.get("/all-files", authMiddleware, getImages);
router.delete("/:fileId", authMiddleware, deleteImage);

router.post("/signIn", requestValidator(singInSchema), signIn);
router.post("/signUp", requestValidator(singUpSchema), signUp);
router.post("/verify", requestValidator(verifySchema), verify);

export { router };
