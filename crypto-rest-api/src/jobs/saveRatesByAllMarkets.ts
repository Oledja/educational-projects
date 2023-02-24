import { CronJob } from "cron";
import CryptoService from "../services/CryptoService";
import getErrorMessage from "../utils/getErrorMessage";

const cryptoService = new CryptoService();

const saveRateByAllMarkets = new CronJob(
  "0 */5 * * * *",
  async () => {
    try {
      await cryptoService.saveRateByAllMarkets();
      console.log("Rates by all markets saved successfully");
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  null,
  true
);

export { saveRateByAllMarkets };
