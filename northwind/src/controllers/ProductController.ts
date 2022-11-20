import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
  private productService = new ProductService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.productService.getAll();
    res.status(200).json(response);
  };

  public getById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.productService.getById(id);
    res.status(200).json(response);
  };

  public getByFilter = async (req: Request, res: Response) => {
    const {
      params: { filter },
    } = req;
    const response = await this.productService.getByFilter(filter);
    res.status(200).json(response);
  };
}

export default ProductController;
