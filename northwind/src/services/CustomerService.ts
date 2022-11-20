import CustomerRepository from "../repositories/CustomerRepository";

class CustomerService {
  private customerRepository = new CustomerRepository();

  public getAll = async () => {
    const { rows } = await this.customerRepository.getAll();
    return rows;
  };

  public getById = async (id: string) => {
    const { rows } = await this.customerRepository.getById(id);
    return rows;
  };

  public getByFilter = async (filter: string) => {
    const { rows } = await this.customerRepository.getByFilter(filter);
    return rows;
  };
}

export default CustomerService;
