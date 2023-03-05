import express from "express";
import SupplierController from "../controllers/SupplierController";

const supplierRouter = express.Router();
const supplierController = new SupplierController();

supplierRouter.get("/suppliers", supplierController.getAll);
supplierRouter.get("/suppliers/:id", supplierController.getById);

export { supplierRouter };
