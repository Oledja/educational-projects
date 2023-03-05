import express from "express";
import CustomerController from "../controllers/CustomerController";

const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.get("/customers", customerController.getAll);
customerRouter.get("/customers/:id", customerController.getById);
customerRouter.get("/customers/search/:filter", customerController.getByFilter);

export { customerRouter };
