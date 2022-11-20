import { pool } from "../db/PostgresPoolConnections";
import { PoolClient } from "pg";
import Order from "../@types/Order";
import * as queries from "../queries/Queries";

class OrderRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async () => {
    const client = await this.client;
    return client.query<Order>(queries.GET_ALL_ORDERS);
  };

  public getOrderById = async (id: string) => {
    const client = await this.client;
    return client.query<Order>(queries.GET_ORDER_BY_ID, [id]);
  };

  public getOrderProductsById = async (id: string) => {
    const client = await this.client;
    return client.query<Order>(queries.GET_ORDER_PRODUCTS, [id]);
  };
}

export default OrderRepository;
