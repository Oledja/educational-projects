import { Router } from "express";
import Controller from "../controllers/Controller";
import { bodyValidator } from "../middlewares/BodyMiddleware";

const router: Router = Router();
const controller = new Controller();
router.get("/:route", controller.get);
router.post("/:route", bodyValidator, controller.save);

export { router };
