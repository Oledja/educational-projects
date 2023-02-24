import { Router } from "express";
import DataController from "../controllers/DataController";
import { bodyValidator } from "../middlewares/BodyMiddleware";

const router: Router = Router();
const dataController = new DataController();
router.get("/:route", dataController.getData);
router.post("/:route", bodyValidator, dataController.saveData);

export { router };
