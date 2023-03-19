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
      const startGetAll = performance.now();
      const orders = await this.orderRepository.getAll();
      const timeGetAll = performance.now() - startGetAll;
      const startNumOfOrders = performance.now();
      const { total } = await this.orderRepository.getNumberOfOrders();
      const timeNumOfOrders = performance.now() - startNumOfOrders;
      const stats: Stats = {
        log: [
          { duration: timeNumOfOrders, query: queries.GET_NUMBER_OF_ORDERS },
          { duration: timeGetAll, query: queries.GET_ALL_ORDERS },
        ],
        queries: 2,
        results: total,
        select: 2,
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
      const startGetById = performance.now();
      const order = await this.orderRepository.getOrderById(id);
      const timeGetById = performance.now() - startGetById;
      if (!order) throw new Error(`Order with id: <${id} doesn't exists>`);
      const stats: Stats = {
        log: [{ duration: timeGetById, query: queries.GET_ORDER_BY_ID }],
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
      const startGetOrderProdById = performance.now();
      const orders = await this.orderRepository.getOrderProductsById(id);
      const timeGetOrderProdById = performance.now() - startGetOrderProdById;
      const stats: Stats = {
        log: [
          { duration: timeGetOrderProdById, query: queries.GET_ORDER_PRODUCTS },
        ],
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
