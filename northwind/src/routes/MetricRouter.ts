import Router from "express";
import { getMetrics } from "../controllers/MetricControllers";

const metricRouter = Router();

metricRouter.get("/metrics", getMetrics);

export { metricRouter };
