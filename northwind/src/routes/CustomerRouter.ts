import express from "express";
import CustomerController from "../controllers/CustomerController";

const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.get("/api/v1/customers", customerController.getAll);
customerRouter.get("/api/v1/customers/:id", customerController.getById);
customerRouter.get(
  "/api/v1/customers/search/:filter",
  customerController.getByFilter
);

export { customerRouter };
