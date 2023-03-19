import { pool } from "../db/connection";
import { PoolClient } from "pg";
import Order from "../interfices/Order";
import * as queries from "../utils/queries";
import OrderProductInfo from "../interfices/OrderProductInfo";
import TotalEntityResult from "../interfices/TotalEntityResult";

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

  public getNumberOfOrders = async (): Promise<TotalEntityResult> => {
    const client = await this.client;
    const { rows: result } = await client.query<TotalEntityResult>(
      queries.GET_NUMBER_OF_ORDERS
    );
    return result[0];
  };
}

export default OrderRepository;
