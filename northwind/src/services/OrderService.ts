import OrderRepository from "../repositories/OrderRepository";
import MetricService from "./MetricsService";
import { errorHandler } from "../errors/errorHandler";
import * as queries from "../queries/Queries";

class OrderService {
  private orderRepository = new OrderRepository();

  public getAll = async () => {
    try {
      const { rows, rowCount } = await this.orderRepository.getAll();
      MetricService.addWhereQuery(rowCount, queries.GET_ALL_ORDERS);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getById = async (id: string) => {
    try {
      const { rows, rowCount } = await this.orderRepository.getOrderById(id);
      MetricService.addWhereQuery(rowCount, queries.GET_ORDER_BY_ID);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getOrderProductsById = async (id: string) => {
    try {
      const { rows, rowCount } =
        await this.orderRepository.getOrderProductsById(id);
      MetricService.addWhereQuery(rowCount, queries.GET_ORDER_PRODUCTS);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };
}

export default OrderService;
