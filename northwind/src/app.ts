import express from "express";
import { supplierRouter } from "./routes/SupplierRouter";
import { productRouter } from "./routes/ProductRouter";
import { orderRouter } from "./routes/OrderRouter";
import { employeeRouter } from "./routes/EmployeeRouter";
import { customerRouter } from "./routes/CustomerRouter";
import * as dotenv from "dotenv";
import { metricRouter } from "./routes/MetricRouter";
import cors from "cors";

dotenv.config();

const port = process.env.APP_PORT;
const app = express();

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(
  cors({
    origin: "https://northwind-5pcc.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.set("trust proxy", true);
app.use(
  "/api/v1",
  supplierRouter,
  productRouter,
  orderRouter,
  employeeRouter,
  customerRouter,
  metricRouter
);
app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});
