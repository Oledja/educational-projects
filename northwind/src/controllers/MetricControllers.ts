import { Request, Response } from "express";
import {
  getClientCountryByIp,
  getNearestAirportByIp,
} from "../services/MetricService";
import { getErrorMessage } from "../utils/getErrorMessage";

const getAirport = async (req: Request, res: Response) => {
  try {
    const { ip } = req;
    const response = await getNearestAirportByIp(ip);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(getErrorMessage(err));
  }
};

const getCountry = (req: Request, res: Response) => {
  try {
    const { ip } = req;
    const response = getClientCountryByIp(ip);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(getErrorMessage(err));
  }
};

export { getAirport, getCountry };
