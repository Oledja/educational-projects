import ProductReposotory from "../repositories/ProductRepository";

class ProductService {
  private productRepository = new ProductReposotory();

  public getAll = async () => {
    const { rows } = await this.productRepository.getAll();
    return rows;
  };

  public getById = async (id: string) => {
    const { rows } = await this.productRepository.getById(id);
    return rows;
  };

  public getByFilter = async (filter: string) => {
    const { rows } = await this.productRepository.getByFilter(filter);
    return rows;
  };
}

export default ProductService;
