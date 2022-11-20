import { Request, Response } from "express";
import CustomerService from "../services/CustomerService";

class CustomerController {
  private customerService = new CustomerService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.customerService.getAll();
    res.status(200).json(response);
  };

  public getById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.customerService.getById(id);
    res.status(200).json(response);
  };

  public getByFilter = async (req: Request, res: Response) => {
    const {
      params: { filter },
    } = req;
    const response = await this.customerService.getByFilter(filter);
    res.status(200).json(response);
  };
}

export default CustomerController;
