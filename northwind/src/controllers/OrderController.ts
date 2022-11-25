import { Request, Response } from "express";
import OrderService from "../services/OrderService";

class OrderConrtoller {
  private orderService = new OrderService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.orderService.getAll();
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };

  public getById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.orderService.getById(id);
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };

  public getOrderProductsById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.orderService.getOrderProductsById(id);
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };
}

export default OrderConrtoller;
