import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import multer from "multer";

const storage = multer.memoryStorage();
const multipleUpload = multer({ storage });
const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", auth, userController.getUser);
userRouter.post("/users", auth, userController.updateUser);
userRouter.post(
  "/users/selfie",
  multipleUpload.any(),
  auth,
  userController.updateUserSelfie
);
userRouter.delete("/users/selfie", auth, userController.deleteUserSelfie);
userRouter.delete("/users", auth, userController.deleteUser);

export { userRouter };
