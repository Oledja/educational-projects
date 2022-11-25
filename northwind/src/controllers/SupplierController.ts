import { Request, Response } from "express";
import SupplierService from "../services/SupplierService";

class SupplierController {
  private supplierService = new SupplierService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.supplierService.getAll();
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
    const response = await this.supplierService.getById(id);
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };
}

export default SupplierController;
