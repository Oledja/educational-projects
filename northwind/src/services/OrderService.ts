import OrderRepository from "../repositories/OrderRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Order from "../interfices/Order";
import OrderProductInfo from "../interfices/OrderProductInfo";
import Stats from "../interfices/Stats";
import * as queries from "../utils/queries";

class OrderService {
  private orderRepository = new OrderRepository();

  public getAll = async (): Promise<{
    orders: Order[];
    stats: Stats;
  }> => {
    try {
      const orders = await this.orderRepository.getAll();
      const stats: Stats = {
        log: [queries.GET_ALL_ORDERS],
        queries: 1,
        results: orders.length,
        select: 1,
      };
      return { orders, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getById = async (
    id: string
  ): Promise<{
    order: Order;
    stats: Stats;
  }> => {
    try {
      const order = await this.orderRepository.getOrderById(id);
      if (!order) throw new Error(`Order with id: <${id} doesn't exists>`);
      const stats: Stats = {
        log: [queries.GET_ORDER_BY_ID],
        queries: 1,
        results: 1,
        select: 1,
        selectWhere: 1,
      };
      return { order, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getOrderProductsById = async (
    id: string
  ): Promise<{
    orders: OrderProductInfo[];
    stats: Stats;
  }> => {
    try {
      const orders = await this.orderRepository.getOrderProductsById(id);
      const stats: Stats = {
        log: [queries.GET_ORDER_PRODUCTS],
        queries: 1,
        results: orders.length,
        select: 1,
        selectWhere: 1,
      };
      return { orders, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default OrderService;
