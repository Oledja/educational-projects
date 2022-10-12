import { Request, Response, NextFunction } from "express";
import cryptocurrencies from "../utill/Cryptocurrencies";
import markets from "../utill/Markets";
import time from "../utill/Time";

const cryptocurrencyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const name = req.query.name as string;
    const timePeriod = req.query.timePeriod as string;
    const market = req.query.market as string;
    if (!cryptocurrencies.get(name))
      throw new Error(
        JSON.stringify({
          error: `Invalid parameter name=${name}`,
          message: `Available values ${cryptocurrencies.toString()}`,
        })
      );
    if (market) {
      if (!markets.includes(market))
        throw new Error(
          JSON.stringify({
            error: `Invalid parameter market=${market}`,
            message: `Available values ${markets.toString()}`,
          })
        );
    }
    if (!time.includes(timePeriod))
      throw new Error(
        JSON.stringify({
          error: `Invalid parameter timePeriod=${timePeriod}`,
          message: `Available values ${time.toString()}`,
        })
      );
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
};

export default cryptocurrencyMiddleware;
