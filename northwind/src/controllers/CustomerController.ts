import { Request, Response } from "express";
import CustomerService from "../services/CustomerService";
import { getErrorMessage } from "../utils/getErrorMessage";

class CustomerController {
  private customerService = new CustomerService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.customerService.getAll();
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
      const response = await this.customerService.getById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  public getByFilter = async (req: Request, res: Response) => {
    try {
      const {
        params: { filter },
      } = req;
      const response = await this.customerService.getByFilter(filter);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default CustomerController;
