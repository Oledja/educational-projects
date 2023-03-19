import { pool } from "../db/connection";
import { PoolClient } from "pg";
import Customer from "../interfices/Customer";
import * as queries from "../utils/queries";
import TotalEntityResult from "../interfices/TotalEntityResult";

class CustomerRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async (): Promise<Customer[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Customer>(
      queries.GET_ALL_CUSTOMERS
    );
    return result;
  };

  public getById = async (id: string): Promise<Customer> => {
    const client = await this.client;
    const { rows: result } = await client.query<Customer>(
      queries.GET_CUSTOMER_BY_ID,
      [id]
    );
    return result[0];
  };

  public getByFilter = async (filter: string): Promise<Customer[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Customer>(
      queries.GET_CUSTOMERS_BY_FILTER,
      [`%${filter}%`]
    );
    return result;
  };

  public getNumberOfCustomers = async (): Promise<TotalEntityResult> => {
    const client = await this.client;
    const { rows: result } = await client.query<TotalEntityResult>(
      queries.GET_NUMBER_OF_CUSTOMERS
    );
    return result[0];
  };
}

export default CustomerRepository;
