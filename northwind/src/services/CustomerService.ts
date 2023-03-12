import CustomerRepository from "../repositories/CustomerRepository";
import * as queries from "../utils/queries";
import { getErrorMessage } from "../utils/getErrorMessage";
import Customer from "../interfices/Customer";
import Stats from "../interfices/Stats";

class CustomerService {
  private customerRepository = new CustomerRepository();

  public getAll = async (): Promise<{
    customers: Customer[];
    stats: Stats;
  }> => {
    try {
      const customers = await this.customerRepository.getAll();
      const stats: Stats = {
        log: [queries.GET_ALL_CUSTOMERS],
        queries: 1,
        results: customers.length,
        select: 1,
      };
      return { customers, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getById = async (
    id: string
  ): Promise<{ customer: Customer; stats: Stats }> => {
    try {
      const customer = await this.customerRepository.getById(id);
      if (!customer)
        throw new Error(`Customer with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [queries.GET_CUSTOMERS_BY_FILTER],
        queries: 1,
        results: 1,
        select: 1,
        selectWhere: 1,
      };
      return { customer, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getByFilter = async (
    filter: string
  ): Promise<{
    customers: Customer[];
    stats: Stats;
  }> => {
    try {
      const customers = await this.customerRepository.getByFilter(filter);
      const stats: Stats = {
        log: [queries.GET_CUSTOMERS_BY_FILTER],
        queries: 1,
        results: customers.length,
        select: 1,
      };
      return { customers, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CustomerService;
