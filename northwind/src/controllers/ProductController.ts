import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
  private productService = new ProductService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.productService.getAll();
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
    const response = await this.productService.getById(id);
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };

  public getByFilter = async (req: Request, res: Response) => {
    const {
      params: { filter },
    } = req;
    const response = await this.productService.getByFilter(filter);
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };
}

export default ProductController;
