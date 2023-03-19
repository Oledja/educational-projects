import Supplier from "../interfices/Supplier";
import { pool } from "../db/connection";
import { PoolClient } from "pg";
import * as queries from "../utils/queries";
import TotalEntityResult from "../interfices/TotalEntityResult";

class SupplierRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async (): Promise<Supplier[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Supplier>(
      queries.GET_ALL_SUPPLIERS
    );
    return result;
  };

  public getById = async (id: string): Promise<Supplier> => {
    const client = await this.client;
    const { rows: result } = await client.query<Supplier>(
      queries.GET_SUPPLIER_BY_ID,
      [id]
    );
    return result[0];
  };

  public getNumberOfSuppliers = async (): Promise<TotalEntityResult> => {
    const client = await this.client;
    const { rows: result } = await client.query<TotalEntityResult>(
      queries.GET_NUMBER_OF_SUPPLIERS
    );
    return result[0];
  };
}

export default SupplierRepository;
