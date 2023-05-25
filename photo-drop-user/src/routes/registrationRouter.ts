import { Router } from "express";
import { RegistrationController } from "../controllers/RegistrationController";

const registrationRouter = Router();
const registrationController = new RegistrationController();

registrationRouter.post("/signin", registrationController.signin);
registrationRouter.post("/otp", registrationController.otp);

export { registrationRouter };
