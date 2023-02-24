import express from "express";
import { Express } from "express";
import mongoose from "mongoose";
import { router } from "./routes/DataRoutes";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

mongoose.connect(process.env.DB_URL);
app.use(express.json());
app.use(express.text());
app.use(router);
app.listen(4000, () => {
    console.log(`Example app listening on port 4000`)
})