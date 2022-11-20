import { pool } from "../db/PostgresPoolConnections";
import { PoolClient } from "pg";
import Employee from "../@types/Employee";
import * as queries from "../queries/Queries";

class EmployeeRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async () => {
    const client = await this.client;
    return client.query<Employee>(queries.GET_ALL_EMPLOYEES);
  };

  public getById = async (id: string) => {
    const client = await this.client;
    return client.query<Employee>(queries.GET_EMPLOYEES_BY_ID, [id]);
  };
}

export default EmployeeRepository;
