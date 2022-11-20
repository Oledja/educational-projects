import express from "express";
import OrderController from "../controllers/OrderController";

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get("/api/v1/orders", orderController.getAll);
orderRouter.get("/api/v1/orders/:id", orderController.getById);
orderRouter.get("/api/v1/orders/products/:id", orderController.getOrderProductsById);

export { orderRouter };
