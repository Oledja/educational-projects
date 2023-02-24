import Router from "express";
import UserControler from "../controllers/UserController";
import { auth } from "../middleware/auth";
import { refresh } from "../middleware/refresh";

const userRouter = Router();
const userController = new UserControler();

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", refresh, userController.refresh);
userRouter.get("/me[0-9]", auth, userController.getMe);

export { userRouter };
