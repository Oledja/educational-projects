import express from "express";
import { clinics } from "./data/schema";
import { connector } from "./db/PostgresPoolConnections";
import { clinicRouter } from "./routes/ClinicRouter";

const app = express();
app.use("/api/v1/", clinicRouter);

app.listen(5000, async () => {
  const db = await connector.connect();
  await connector.migrate("./drizzle.config.json");
});
