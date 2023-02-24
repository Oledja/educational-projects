import express from "express";
import * as dotenv from "dotenv";
import { orderRouter } from "./routes/OrderRouter";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(orderRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
