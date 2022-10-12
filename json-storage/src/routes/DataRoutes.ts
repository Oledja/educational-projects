import { Router } from "express";
import { bodyValidator } from "../middlewares/BodyMiddleware";
import dataController from "../controllers/DataController";

const router: Router = Router();

router.get("/:route", dataController.getData);
router.post("/:route", bodyValidator, dataController.saveData);

export { router };
