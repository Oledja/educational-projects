import express from "express";
import EmployeeController from "../controllers/EmployeeController";

const employeeRouter = express.Router();
const employeeController = new EmployeeController();

employeeRouter.get("/employees", employeeController.getAll);
employeeRouter.get("/employees/:id", employeeController.getById);

export { employeeRouter };
