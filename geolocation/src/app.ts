import express from "express";
import { geolocationRouter } from "./routes/GeolocationRouter";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use("/", geolocationRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
