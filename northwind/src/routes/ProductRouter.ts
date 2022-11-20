import express from "express";
import ProductController from "../controllers/ProductController";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/api/v1/products", productController.getAll);
productRouter.get("/api/v1/products/:id", productController.getById);
productRouter.get(
  "/api/v1/products/search/:filter",
  productController.getByFilter
);

export { productRouter };
