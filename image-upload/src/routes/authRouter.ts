import Router from "express";
import AuthController from "../controllers/AuthController";
import { requestValidator } from "../middlewares/RequestValidator";
import {
  singInSchema,
  singUpSchema,
  verifySchema,
} from "../validations/ValidationScemas";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/signIn",
  requestValidator(singInSchema),
  authController.signIn
);
authRouter.post(
  "/signUp",
  requestValidator(singUpSchema),
  authController.signUp
);
authRouter.post(
  "/verify",
  requestValidator(verifySchema),
  authController.verify
);

export { authRouter };
