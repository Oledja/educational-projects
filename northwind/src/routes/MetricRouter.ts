import Router from "express";
import { getAirport, getCountry } from "../controllers/MetricControllers";

const metricRouter = Router();

metricRouter.get("/metrics/airport", getAirport);
metricRouter.get("/metrics/country", getCountry);

export { metricRouter };
