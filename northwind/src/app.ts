import express from "express";
import { supplierRouter } from "./routes/SupplierRouter";
import { productRouter } from "./routes/ProductRouter";
import { orderRouter } from "./routes/OrderRouter";
import { employeeRouter } from "./routes/EmployeeRouter";
import { customerRouter } from "./routes/CustomerRouter";
import * as dotenv from "dotenv";
import { metricRouter } from "./routes/MetricRouter";

dotenv.config();

const port = process.env.APP_PORT;
const app = express();
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
  console.log(`Server started on port ${port}`);
});
