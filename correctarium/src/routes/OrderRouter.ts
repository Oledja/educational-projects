import Router from "express";
import OrderController from "../controllers/OrderController";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post("/make-order", orderController.makeOrder);

export { orderRouter };
