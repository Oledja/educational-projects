import { Request, Response } from "express";
import CreateOrder from "../interfaces/CreateOrder";
import OrderService from "../services/OrderService";
import { getErrorMessage } from "../utils/getErrorMessage";

class OrderController {
  private orderService = new OrderService();

  makeOrder = async (req: Request, res: Response) => {
    try {
      const order: CreateOrder = req.body;
      const response = this.orderService.makeOrder(order);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default OrderController;
