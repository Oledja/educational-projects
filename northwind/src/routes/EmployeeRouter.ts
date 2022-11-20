import express from "express";
import EmployeeController from "../controllers/EmployeeController";

const employeeRouter = express.Router();
const employeeController = new EmployeeController();

employeeRouter.get("/api/v1/employees", employeeController.getAll);
employeeRouter.get("/api/v1/employees/:id", employeeController.getById);

export { employeeRouter };
