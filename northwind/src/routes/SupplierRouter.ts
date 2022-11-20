import express from "express";
import SupplierController from "../controllers/SupplierController";

const supplierRouter = express.Router();
const supplierController = new SupplierController();

supplierRouter.get("/api/v1/suppliers", supplierController.getAll);
supplierRouter.get("/api/v1/suppliers/:id", supplierController.getById);

export { supplierRouter };
