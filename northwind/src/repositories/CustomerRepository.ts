import { pool } from "../db/PostgresPoolConnections";
import { PoolClient } from "pg";
import Customer from "../@types/Customer";
import * as queries from "../queries/Queries";

class CustomerRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async () => {
    const client = await this.client;
    return client.query<Customer>(queries.GET_ALL_CUSTOMERS);
  };

  public getById = async (id: string) => {
    const client = await this.client;
    return client.query<Customer>(queries.GET_CUSTOMER_BY_ID, [id]);
  };

  public getByFilter = async (filter: string) => {
    const client = await this.client;
    return client.query<Customer>(queries.GET_CUSTOMERS_BY_FILTER, [
      `%${filter}%`,
    ]);
  };
}

export default CustomerRepository;
