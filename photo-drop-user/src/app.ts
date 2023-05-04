import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./db/connection";
import bodyParser from "body-parser";
import morgan from "morgan";
import { readFileSync } from "fs";
import https from "https";
import { folderRouter } from "./routes/folderRouter";
import { photoRouter } from "./routes/photoRouter";
import { registrationRouter } from "./routes/registrationRouter";
import { storeRouter } from "./routes/storeRouter";
import { userRouter } from "./routes/userRouter";

dotenv.config();

const port = process.env.APP_PORT;
const certPath = process.env.CERT_PATH;
const keyPath = process.env.KEY_PATH;
const certificate = readFileSync(certPath);
const privateKey = readFileSync(keyPath);
const credentials = { key: privateKey, cert: certificate };
const app = express();
const httpsServer = https.createServer(credentials, app);

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
    origin: ["http://91.226.255.138", "https://91.226.255.138"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.set("trust proxy", true);
app.use(
  "/api/v1",
  userRouter,
  registrationRouter,
  photoRouter,
  folderRouter,
  storeRouter,
  storeRouter
);
httpsServer.listen(port, async () => {
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log(`Server started on port ${port}`);
});
