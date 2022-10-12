import ICryptocurrency from "./ICryptocurrency";

interface CryptocurrencyClient {
  getCryptocurrencyRate(): Promise<ICryptocurrency[]>;
}

export default CryptocurrencyClient;
