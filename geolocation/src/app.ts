import express from "express";
import { geolocationRouter } from "./routes/GeolocationRouter";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use("/", geolocationRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
