import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./db/connection";
import { photographerRouter } from "./routes/photographerRouter";
import bodyParser from "body-parser";
import morgan from "morgan";
import { readFileSync } from "fs";
import { folderRouter } from "./routes/folderRouter";
import { registrationRouter } from "./routes/registrationRouter";
import { userRouter } from "./routes/userRouter";
import { photoRouter } from "./routes/photoRouter";
import https from "https";

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
    origin: "http://192.168.10.2:5173/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.set("trust proxy", true);
app.use(
  "/api/v1",
  registrationRouter,
  photographerRouter,
  folderRouter,
  userRouter,
  photoRouter
);
httpsServer.listen(port, async () => {
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log(`Server started on port ${port}`);
});
