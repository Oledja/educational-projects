import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

const userRouter = Router();
const userConteroller = new UserController();

userRouter.patch("/users", auth, userConteroller.updateUser);
userRouter.patch("/users/restore", userConteroller.restorePassword);

export { userRouter };
