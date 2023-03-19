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
      const startGetAll = performance.now();
      const customers = await this.customerRepository.getAll();
      const timeGetAll = performance.now() - startGetAll;
      const startNumOfCustomers = performance.now();
      const { total } = await this.customerRepository.getNumberOfCustomers();
      const timeGNumOfCustomers = performance.now() - startNumOfCustomers;

      const stats: Stats = {
        log: [
          {
            duration: timeGNumOfCustomers,
            query: queries.GET_NUMBER_OF_CUSTOMERS,
          },
          { duration: timeGetAll, query: queries.GET_ALL_CUSTOMERS },
        ],
        queries: 2,
        results: total,
        select: 2,
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
      const startGetById = performance.now();
      const customer = await this.customerRepository.getById(id);
      const timeGetById = performance.now() - startGetById;
      if (!customer)
        throw new Error(`Customer with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [
          { duration: timeGetById, query: queries.GET_CUSTOMERS_BY_FILTER },
        ],
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
      const startGetByFilter = performance.now();
      const customers = await this.customerRepository.getByFilter(filter);
      const timeGetByFilter = performance.now() - startGetByFilter;

      const stats: Stats = {
        log: [
          { duration: timeGetByFilter, query: queries.GET_CUSTOMERS_BY_FILTER },
        ],
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
