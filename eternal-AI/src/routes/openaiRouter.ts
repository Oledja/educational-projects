import { Router } from "express";
import { OpenaiController } from "../controllers/OpenaiController";
import { auth } from "../middlewares/auth";

const openaiRouter = Router();
const openaiController = new OpenaiController();

openaiRouter.post("/openai", auth, openaiController.getAnswer);
openaiRouter.post("/openai/free", openaiController.getFreeAnswer);

export { openaiRouter };
