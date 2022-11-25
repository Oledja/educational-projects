import express from "express";
import { supplierRouter } from "./routes/SupplierRouter";
import { productRouter } from "./routes/ProductRouter";
import { orderRouter } from "./routes/OrderRouter";
import { employeeRouter } from "./routes/EmployeeRouter";
import { customerRouter } from "./routes/CustomerRouter";
import { metricRouter } from "./routes/MetricRouter";

const app = express();
app.set("trust proxy", true);
app.use(
  supplierRouter,
  productRouter,
  orderRouter,
  employeeRouter,
  customerRouter,
  metricRouter
);
app.listen(5000, () => {});
