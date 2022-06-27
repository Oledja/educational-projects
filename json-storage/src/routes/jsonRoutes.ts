import { Router } from 'express';
import { homePage, getJson, addJson } from '../controllers/jsonController';
import { jsonValidator } from '../middleware/jsonMiddleware';

export const router: Router = Router();

router.get("/:route", getJson);
router.get("/", homePage);
router.post("/:route",jsonValidator, addJson);