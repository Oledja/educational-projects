import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authController = new AuthController();

authRouter.get("/auth-uri", authController.getGoogleAuthUrl);
authRouter.post("/signup", authController.signUp);
authRouter.post("/signup/google", authController.signUpGoogle);
authRouter.post("/login", authController.login);

export { authRouter };
