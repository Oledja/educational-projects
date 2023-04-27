import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", auth, userController.getUsers);
userRouter.get("/users/photos/:id/marked", userController.getMarkedUser);

export { userRouter };
