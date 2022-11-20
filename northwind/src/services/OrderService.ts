import OrderRepository from "../repositories/OrderRepository";

class OrderService {
  private orderRepository = new OrderRepository();

  public getAll = async () => {
    const { rows } = await this.orderRepository.getAll();
    return rows;
  };

  public getById = async (id: string) => {
    const { rows } = await this.orderRepository.getOrderById(id);
    return rows;
  };

  public getOrderProductsById = async (id: string) => {
    const { rows } = await this.orderRepository.getOrderProductsById(id);
    return rows;
  };
}

export default OrderService;
