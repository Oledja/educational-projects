import { Request, Response } from "express";
import EmployeeService from "../services/EmployeeService";
import { getErrorMessage } from "../utils/getErrorMessage";

class EmployeeController {
  private employeeService = new EmployeeService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.employeeService.getAll();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;
      const response = await this.employeeService.getById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default EmployeeController;
