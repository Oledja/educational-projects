import { Request, Response } from "express";
import OrderService from "../services/OrderService";
import { getErrorMessage } from "../utils/getErrorMessage";

class OrderConrtoller {
  private orderService = new OrderService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.orderService.getAll();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;
      const response = await this.orderService.getById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  public getOrderProductsById = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;
      const response = await this.orderService.getOrderProductsById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default OrderConrtoller;
