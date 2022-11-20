import { Request, Response } from "express";
import EmployeeService from "../services/EmployeeService";

class EmployeeController {
  private employeeService = new EmployeeService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.employeeService.getAll();
    res.status(200).json(response);
  };

  public getById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const response = await this.employeeService.getById(id);
    res.status(200).json(response);
  };
}

export default EmployeeController;
