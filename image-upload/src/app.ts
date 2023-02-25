import express, { Express } from "express";
import bodyParser from "body-parser";
import { authRouter } from "./routes/authRouter";
import { imageUploadRouter } from "./routes/ImageUploadRouter";

const port = process.env.APP_PORT;

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authRouter, imageUploadRouter);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
