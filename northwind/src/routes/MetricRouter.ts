import express from "express";
import {
  getMetrics,
  resetMetrics,
  getNearestAirport,
  getCountry,
} from "../controllers/MetricController";

const metricRouter = express.Router();

metricRouter.get("/api/v1/metrics", getMetrics);
metricRouter.get("/api/v1/metrics/reset", resetMetrics);
metricRouter.get("/api/v1/metrics/airport", getNearestAirport);
metricRouter.get("/api/v1/metrics/country", getCountry);

export { metricRouter };
