import EmployeeRepository from "../repositories/EmployeeRepository";

class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  public getAll = async () => {
    const { rows } = await this.employeeRepository.getAll();
    return rows;
  };

  public getById = async (id: string) => {
    const { rows } = await this.employeeRepository.getById(id);
    return rows;
  };
}

export default EmployeeService;
