import express from "express";
import { cryptoRouter } from "./routes/CryptoRouter";
import { saveRateByAllMarkets } from "./jobs/saveRatesByAllMarkets";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_PORT;
const app = express();
app.use(cryptoRouter);
app.listen(PORT, async () => {
  try {
    console.log(`Server started on port ${PORT}`);
    saveRateByAllMarkets;
  } catch (err) {
    console.log(err);
  }
});
