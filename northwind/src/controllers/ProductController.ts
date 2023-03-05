import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { getErrorMessage } from "../utils/getErrorMessage";

class ProductController {
  private productService = new ProductService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.productService.getAll();
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
      const response = await this.productService.getById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(getErrorMessage(err));
    }
  };

  public getByFilter = async (req: Request, res: Response) => {
    try {
      const {
        params: { filter },
      } = req;
      const response = await this.productService.getByFilter(filter);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(getErrorMessage(err));
    }
  };
}

export default ProductController;
