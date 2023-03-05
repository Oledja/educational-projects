import { pool } from "../db/connection";
import { PoolClient } from "pg";
import Order from "../interfices/Order";
import * as queries from "../utils/queries";
import OrderProductInfo from "../interfices/OrderProductInfo";

class OrderRepository {
  private client: Promise<PoolClient> = pool.connect();

  public getAll = async (): Promise<Order[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<Order>(queries.GET_ALL_ORDERS);
    return result;
  };

  public getOrderById = async (id: string): Promise<Order> => {
    const client = await this.client;
    const { rows: result } = await client.query<Order>(
      queries.GET_ORDER_BY_ID,
      [id]
    );
    return result[0];
  };

  public getOrderProductsById = async (
    id: string
  ): Promise<OrderProductInfo[]> => {
    const client = await this.client;
    const { rows: result } = await client.query<OrderProductInfo>(
      queries.GET_ORDER_PRODUCTS,
      [id]
    );
    return result;
  };
}

export default OrderRepository;
