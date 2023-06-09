import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { pool } from "./db/connection";
import { authRouter } from "./routes/authRouter";
import { userRouter } from "./routes/userRouter";
import { openaiRouter } from "./routes/openaiRouter";
import { subscriptionRouter } from "./routes/subscriptionRouter";

dotenv.config();

const port = process.env.APP_PORT;
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
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
app.use("/api/v1", authRouter, userRouter, openaiRouter, subscriptionRouter);
app.listen(port, async () => {
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log(`Server started on port ${port}`);
});
