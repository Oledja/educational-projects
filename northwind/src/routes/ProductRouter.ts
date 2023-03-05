import express from "express";
import ProductController from "../controllers/ProductController";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/products", productController.getAll);
productRouter.get("/products/:id", productController.getById);
productRouter.get("/products/search/:filter", productController.getByFilter);

export { productRouter };
