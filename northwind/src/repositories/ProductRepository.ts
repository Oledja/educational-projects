import Product from "../@types/Product";
import { pool } from "../db/PostgresPoolConnections";
import { PoolClient } from "pg";
import * as queries from "../queries/Queries";

class ProductReposotory {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async () => {
    const client = await this.client;
    return client.query<Product>(queries.GET_ALL_PRODUCTS);
  };

  public getById = async (id: string) => {
    const client = await this.client;
    return client.query<Product>(queries.GET_PRODUCTS_BY_ID, [id]);
  };

  public getByFilter = async (filter: string) => {
    const client = await this.client;
    return client.query<Product>(queries.GET_PRODUCTS_BY_FILTER, [
      `%${filter}%`,
    ]);
  };
}

export default ProductReposotory;
