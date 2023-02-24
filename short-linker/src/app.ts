import bodyParser from "body-parser";
import express, { Express } from "express";
import router from "./routers/ShortLinkerRouter";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.APP_PORT;
const app: Express = express();

app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
