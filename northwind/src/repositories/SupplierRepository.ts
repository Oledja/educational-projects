import Supplier from "../@types/Supplier";
import { pool } from "../db/PostgresPoolConnections";
import { PoolClient } from "pg";
import * as queries from "../queries/Queries";

class SupplierRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async () => {
    const client = await this.client;
    return client.query<Supplier>(queries.GET_ALL_SUPPLIERS);
  };

  public getById = async (id: string) => {
    const client = await this.client;
    return client.query<Supplier>(queries.GET_SUPPLIER_BY_ID, [id]);
  };
}

export default SupplierRepository;
