import { Router } from "express";
import { RegistrationController } from "../controllers/RegistrationController";

const registrationRouter = Router();
const registrationController = new RegistrationController();

registrationRouter.post("/registration", registrationController.registration);
registrationRouter.post("/login", registrationController.login);

export { registrationRouter };
