import Product from "../interfices/Product";
import { pool } from "../db/connection";
import { PoolClient } from "pg";
import * as queries from "../utils/queries";
import TotalEntityResult from "../interfices/TotalEntityResult";

class ProductReposotory {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async (): Promise<Product[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Product>(
      queries.GET_ALL_PRODUCTS
    );
    return result;
  };

  public getById = async (id: string): Promise<Product> => {
    const client = await this.client;
    const { rows: result } = await client.query<Product>(
      queries.GET_PRODUCTS_BY_ID,
      [id]
    );

    return result[0];
  };

  public getByFilter = async (filter: string): Promise<Product[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Product>(
      queries.GET_PRODUCTS_BY_FILTER,
      [`%${filter}%`]
    );
    return result;
  };

  public getNumberOfProducts = async (): Promise<TotalEntityResult> => {
    const client = await this.client;
    const { rows: result } = await client.query<TotalEntityResult>(
      queries.GET_NUMBER_OF_PRODUCTS
    );
    return result[0];
  };
}

export default ProductReposotory;
