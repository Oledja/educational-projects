import axios from "axios";
import ICryptocurrency from "../@Types/ICryptocurrency";
import markets from "../utill/Markets";

class CurrencyClient {
  public async getAvgPriceByName(name: string): Promise<ICryptocurrency> {
    const { data: result } = await axios.get(
      `https://cryptocurrency-rest-api-ts.herokuapp.com/cryptocurrency?name=${name}&timePeriod=FIFTY_MINUTES`
    );
    return result;
  }

  public async getAllCurrencyForDay(
    name: string
  ): Promise<ICryptocurrency[][]> {
    const res = await Promise.all(
      markets.map((market) => getCurrencyByNameAndMarket(name, market))
    );
    return res;
  }
}
const getCurrencyByNameAndMarket = async (
  name: string,
  market: string
): Promise<ICryptocurrency[]> => {
  const { data: result } = await axios.get(
    `https://cryptocurrency-rest-api-ts.herokuapp.com/cryptocurrency?name=${name}&market=${market}&timePeriod=DAY`
  );
  return result;
};

export default CurrencyClient;
