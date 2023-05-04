import { Router } from "express";
import { RegistrationController } from "../controllers/RegistrationController";

const registrationRouter = Router();
const registrationController = new RegistrationController();

registrationRouter.post("/login", registrationController.login);
registrationRouter.post("/verification", registrationController.verification);

export { registrationRouter };
