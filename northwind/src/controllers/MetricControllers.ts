import { Request, Response } from "express";
import {
  getClientCountryByIp,
  getNearestAirportByIp,
} from "../services/MetricService";
import { getErrorMessage } from "../utils/getErrorMessage";

const getMetrics = async (req: Request, res: Response) => {
  try {
    const { ip } = req;
    const colo = await getNearestAirportByIp(ip);
    const country = getClientCountryByIp(ip);
    res.status(200).json({ colo, country });
  } catch (err) {
    res.status(500).json(getErrorMessage(err));
  }
};

export { getMetrics };
