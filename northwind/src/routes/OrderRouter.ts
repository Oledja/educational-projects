import express from "express";
import OrderController from "../controllers/OrderController";

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get("/orders", orderController.getAll);
orderRouter.get("/orders/:id", orderController.getById);
orderRouter.get("/orders/products/:id", orderController.getOrderProductsById);

export { orderRouter };
