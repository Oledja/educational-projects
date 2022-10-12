import { CronJob } from "cron";
import CoinClient from "./@types/CryptocurrencyClient";
import CoinBaseClient from "./clients/CoinBaseClient";
import CoinMarketCapClient from "./clients/CoinMarketCapClient";
import CoinPaprikaClient from "./clients/CoinPaprikaClient";
import CoinStatsClient from "./clients/CoinStatsClient";
import KuCoinClient from "./clients/KuCoinClient";
import CryptocurrencyService from "./services/CryptocurrencyService";

const cryptocurrencyService = new CryptocurrencyService();
const clients: CoinClient[] = [
  new CoinBaseClient(),
  new CoinMarketCapClient(),
  new CoinPaprikaClient(),
  new CoinStatsClient(),
  new KuCoinClient(),
];
const cronJob: CronJob = new CronJob("0 */5 * * * *", async () =>
  cryptocurrencyService.saveCryptocurrencyRate(clients)
);

export default cronJob;
