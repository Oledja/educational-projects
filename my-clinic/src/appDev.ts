import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { clinicRouter } from "./routes/ClinicRouter";
import "reflect-metadata";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./db/connection";

dotenv.config();

const port = process.env.APP_PORT;

const app = express();

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(
  cors({
    origin: "http://192.168.10.2:5173/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.set("trust proxy", true);
app.use("/api/v1", clinicRouter);
app.listen(port, async () => {
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log(`Server started on port ${port}`);
});
