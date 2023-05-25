import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", auth, userController.getUsers);

export { userRouter };
