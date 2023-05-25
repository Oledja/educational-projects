import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import multer from "multer";

const storage = multer.memoryStorage();
const multipleUpload = multer({ storage });
const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", auth, userController.getUser);
userRouter.post("/users/phone/otp", auth, userController.updateUserPhoneOTP);
userRouter.patch("/users/phone", auth, userController.updateUserPhone);
userRouter.patch("/users/name", auth, userController.updateUserName);
userRouter.patch(
  "/users/selfie",
  multipleUpload.any(),
  auth,
  userController.updateUserSelfie
);

export { userRouter };
