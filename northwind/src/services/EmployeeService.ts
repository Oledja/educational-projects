import EmployeeRepository from "../repositories/EmployeeRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Employee from "../interfices/Employee";
import Stats from "../interfices/Stats";
import * as queries from "../utils/queries";

class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  public getAll = async (): Promise<{
    employees: Employee[];
    stats: Stats;
  }> => {
    try {
      const employees = await this.employeeRepository.getAll();
      const stats: Stats = {
        log: [queries.GET_ALL_EMPLOYEES],
        queries: 1,
        results: employees.length,
        select: 1,
        selectLeftJoin: 1,
      };
      return { employees, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getById = async (
    id: string
  ): Promise<{
    employee: Employee;
    stats: Stats;
  }> => {
    try {
      const employee = await this.employeeRepository.getById(id);
      if (!employee)
        throw new Error(`Employee with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [queries.GET_EMPLOYEES_BY_ID],
        queries: 1,
        results: 1,
        select: 1,
        selectWhere: 1,
        selectLeftJoin: 1,
      };
      return { employee, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default EmployeeService;
