import express, { Express } from "express";
import { router } from "./routes/ImageUploadRouter";
import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.listen(process.env.PORT || 5000, () => {});
