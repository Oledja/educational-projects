import { Request, Response } from "express";
import ICryptocurrency from "../@types/ICryptocurrency";
import CryptocurrencyService from "../services/CryptocurrencyService";
import { getFilterTime } from "../utill/utill";

const cryptocurrencyService = new CryptocurrencyService();

const getCoinAverageRate = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const timePeriod = req.query.timePeriod as string;
  const market = req.query.market as string;
  const time = getFilterTime(timePeriod);
  let response: ICryptocurrency | ICryptocurrency[];
  if (market) {
    response =
      await cryptocurrencyService.getAveragePriceBySymbolAndMarketAndTime(
        name,
        market,
        time
      );
  } else {
    response = await cryptocurrencyService.getAveragePriceBySymbolAndTime(
      name,
      time
    );
  }
  res.status(200).json(response);
};

export { getCoinAverageRate };
