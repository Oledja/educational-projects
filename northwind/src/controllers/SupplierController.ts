import { Request, Response } from "express";
import SupplierService from "../services/SupplierService";
import { getErrorMessage } from "../utils/getErrorMessage";

class SupplierController {
  private supplierService = new SupplierService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.supplierService.getAll();
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
      const response = await this.supplierService.getById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default SupplierController;
