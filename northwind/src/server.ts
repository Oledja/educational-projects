import express from "express";
import { supplierRouter } from "./routes/SupplierRouter";
import { productRouter } from "./routes/ProductRouter";
import { orderRouter } from "./routes/OrderRouter";
import { employeeRouter } from "./routes/EmployeeRouter";
import { customerRouter } from "./routes/CustomerRouter";

const app = express();

app.use(
  supplierRouter,
  productRouter,
  orderRouter,
  employeeRouter,
  customerRouter
);
app.listen(5000, () => {});
