import EmployeeRepository from "../repositories/EmployeeRepository";
import * as queries from "../queries/Queries";
import MetricService from "./MetricsService";
import { errorHandler } from "../errors/errorHandler";

class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  public getAll = async () => {
    try {
      const { rows, rowCount } = await this.employeeRepository.getAll();
      MetricService.addLeftJoinQuery(rowCount, queries.GET_ALL_EMPLOYEES);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getById = async (id: string) => {
    try {
      const { rows, rowCount } = await this.employeeRepository.getById(id);
      MetricService.addLeftJoinQuery(rowCount, queries.GET_EMPLOYEES_BY_ID);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };
}

export default EmployeeService;
