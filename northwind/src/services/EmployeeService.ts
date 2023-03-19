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
      const startGetAll = performance.now();
      const employees = await this.employeeRepository.getAll();
      const timeGetAll = performance.now() - startGetAll;
      const startNumOfEmployees = performance.now();
      const { total } = await this.employeeRepository.getNumberOfEmployees();
      const timeNumOfEmployees = performance.now() - startNumOfEmployees;

      const stats: Stats = {
        log: [
          {
            duration: timeNumOfEmployees,
            query: queries.GET_NUMBER_OF_EMPLOYEES,
          },
          { duration: timeGetAll, query: queries.GET_ALL_EMPLOYEES },
        ],
        queries: 2,
        results: total,
        select: 2,
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
      const startGetById = performance.now();
      const employee = await this.employeeRepository.getById(id);
      const timeGetById = performance.now() - startGetById;

      if (!employee)
        throw new Error(`Employee with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [{ duration: timeGetById, query: queries.GET_EMPLOYEES_BY_ID }],
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
