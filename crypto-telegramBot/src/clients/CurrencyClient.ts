import axios from "axios";
import ICryptocurrency from "../interfaces/ICryptocurrency";
import markets from "../utill/Markets";
import * as dotenv from "dotenv";
import getErrorMessage from "../utill/getErrorMessage";

dotenv.config();

class CurrencyClient {
  private url = process.env.API_CLIENT_URL;

  public async getAvgPriceByName(name: string): Promise<ICryptocurrency> {
    try {
      const { data: result } = await axios.get<ICryptocurrency>(
        `${this.url}?symbol=${name}&time=FIFTY_MINUTES`
      );
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getAllCurrencyForDay(
    name: string
  ): Promise<ICryptocurrency[][]> {
    try {
      const res = await Promise.all(
        markets.map((market) => this.getCurrencyByNameAndMarket(name, market))
      );
      return res;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  private getCurrencyByNameAndMarket = async (
    name: string,
    market: string
  ): Promise<ICryptocurrency[]> => {
    try {
      const { data: result } = await axios.get<ICryptocurrency[]>(
        `${this.url}?symbol=${name}&market=${market}&time=DAY`
      );
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CurrencyClient;
