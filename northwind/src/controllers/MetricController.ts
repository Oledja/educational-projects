import { Request, Response } from "express";
import MetricService, {
  getClientCountryByIp,
  getNearestAirportByIp,
} from "../services/MetricsService";

const getMetrics = async (req: Request, res: Response) => {
  const response = MetricService.getMetrics();
  res.status(200).json(response);
};

const resetMetrics = async (req: Request, res: Response) => {
  MetricService.dropMetrics();
  res.status(200).json("Metrics droped successful");
};

const getCountry = async (req: Request, res: Response) => {
  const { ip } = req;

  const country = getClientCountryByIp(ip);
  if (country instanceof Error) {
    res.status(400).json(country.message);
  } else {
    res.status(200).json(country);
  }
};

const getNearestAirport = async (req: Request, res: Response) => {
  const { ip } = req;

  const nearestAirport = await getNearestAirportByIp(ip);
  if (nearestAirport instanceof Error) {
    res.status(400).json(nearestAirport.message);
  } else {
    res.status(200).json(nearestAirport);
  }
};

export { getMetrics, resetMetrics, getNearestAirport, getCountry };
