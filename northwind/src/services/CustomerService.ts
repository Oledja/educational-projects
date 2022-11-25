import CustomerRepository from "../repositories/CustomerRepository";
import MetricService from "./MetricsService";
import * as queries from "../queries/Queries";
import { errorHandler } from "../errors/errorHandler";

class CustomerService {
  private customerRepository = new CustomerRepository();

  public getAll = async () => {
    try {
      const { rows, rowCount } = await this.customerRepository.getAll();
      MetricService.addSelectQuery(rowCount, queries.GET_ALL_CUSTOMERS);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getById = async (id: string) => {
    try {
      const { rows, rowCount } = await this.customerRepository.getById(id);
      MetricService.addWhereQuery(rowCount, queries.GET_CUSTOMER_BY_ID);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getByFilter = async (filter: string) => {
    try {
      const { rows, rowCount } = await this.customerRepository.getByFilter(
        filter
      );
      MetricService.addWhereQuery(rowCount, queries.GET_CUSTOMERS_BY_FILTER);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };
}

export default CustomerService;
