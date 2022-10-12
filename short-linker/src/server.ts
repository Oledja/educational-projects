import bodyParser from "body-parser";
import express, { Express } from "express";
import router from "./routers/ShortLinkerRouter";

const app: Express = express();

app.use(bodyParser.json());
app.use("/", router);

app.listen(5000, () => {});
