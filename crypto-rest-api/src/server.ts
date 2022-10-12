import express, { Express } from "express";
import cronJob from "./CronJob";
import router from "./routes/CryptocurrencyRouter";

const app: Express = express();
app.use("/cryptocurrency", router);

app.listen(process.env.PORT || 5000, () => {
  cronJob.start();
});
