import express from "express";
import { Express } from "express";
import mongoose from "mongoose";
import { router } from "./routes/Router";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

mongoose.connect(process.env.DB_URL);
app.use(express.json());
app.use(express.text());
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
