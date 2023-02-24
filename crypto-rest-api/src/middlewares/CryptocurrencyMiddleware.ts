import { Request, Response, NextFunction } from "express";
import RequestOptions from "../interfices/RequestOptions";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import getErrorMessage from "../utils/getErrorMessage";
import markets from "../utils/Markets";
import timePeriod from "../utils/Time";

const cryptoMiddleware = (
  req: Request<{}, {}, {}, RequestOptions>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { symbol, market, time } = req.query;
    if (!cryptocurrencies.get(symbol))
      throw new Error(
        JSON.stringify({
          error: `Invalid parameter name=${symbol}`,
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
    if (time) {
      if (!timePeriod.includes(time))
        throw new Error(
          JSON.stringify({
            error: `Invalid parameter time=${time}`,
            message: `Available values ${time.toString()}`,
          })
        );
    }
    next();
  } catch (err) {
    res.status(500).json(getErrorMessage(err));
  }
};

export default cryptoMiddleware;
