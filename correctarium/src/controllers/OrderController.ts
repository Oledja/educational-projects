import { Request, Response } from "express";
import CreateOrder from "../interfaces/CreateOrder";
import OrderService from "../services/OrderService";

class OrderController {
  private orderService = new OrderService();

  makeOrder = async (req: Request, res: Response) => {
    try {
      const order: CreateOrder = req.body;
      const response = this.orderService.makeOrder(order);
      res.status(200).json(response);
    } catch (err) {
      if (err instanceof Error) res.status(500).json(err.message);
      res.status(500).json(new String(err));
    }
  };
}

export default OrderController;
