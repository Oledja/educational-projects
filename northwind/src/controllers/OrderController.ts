import { Request, Response } from "express";
import OrderService from "../services/OrderService";

class OrderConrtoller {
  private orderService = new OrderService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.orderService.getAll();
    res.status(200).json(response);
  };

  public getById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.orderService.getById(id);
    res.status(200).json(response);
  };

  public getOrderProductsById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.orderService.getOrderProductsById(id);
    res.status(200).json(response);
  };
}

export default OrderConrtoller;
