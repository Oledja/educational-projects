import { Request, Response } from "express";
import EmployeeService from "../services/EmployeeService";

class EmployeeController {
  private employeeService = new EmployeeService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.employeeService.getAll();
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
    const response = await this.employeeService.getById(id);
    if (response instanceof Error) {
      res.status(400).json(response.message);
    } else {
      res.status(200).json(response);
    }
  };
}

export default EmployeeController;
