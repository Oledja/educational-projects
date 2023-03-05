import { pool } from "../db/connection";
import { PoolClient } from "pg";
import Employee from "../interfices/Employee";
import * as queries from "../utils/queries";

class EmployeeRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async (): Promise<Employee[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Employee>(
      queries.GET_ALL_EMPLOYEES
    );
    return result;
  };

  public getById = async (id: string): Promise<Employee> => {
    const client = await this.client;
    const { rows: result } = await client.query<Employee>(
      queries.GET_EMPLOYEES_BY_ID,
      [id]
    );
    return result[0];
  };
}

export default EmployeeRepository;
