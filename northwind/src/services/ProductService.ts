import ProductReposotory from "../repositories/ProductRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Product from "../interfices/Product";
import * as queries from "../utils/queries";
import Stats from "../interfices/Stats";

class ProductService {
  private productRepository = new ProductReposotory();

  public getAll = async (): Promise<{
    products: Product[];
    stats: Stats;
  }> => {
    try {
      const startGetAll = performance.now();
      const products = await this.productRepository.getAll();
      const timeGetAll = performance.now() - startGetAll;
      const startNumOfProducts = performance.now();
      const { total } = await this.productRepository.getNumberOfProducts();
      const timeNumOfProducts = performance.now() - startNumOfProducts;
      const stats: Stats = {
        log: [
          {
            duration: timeNumOfProducts,
            query: queries.GET_NUMBER_OF_PRODUCTS,
          },
          { duration: timeGetAll, query: queries.GET_ALL_PRODUCTS },
        ],
        queries: 2,
        results: total,
        select: 2,
      };
      return { products, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getById = async (
    id: string
  ): Promise<{
    product: Product;
    stats: Stats;
  }> => {
    try {
      const startGetById = performance.now();
      const product = await this.productRepository.getById(id);
      const timeGetById = performance.now() - startGetById;

      if (!product) throw new Error(`Product with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [{ duration: timeGetById, query: queries.GET_PRODUCTS_BY_ID }],
        queries: 1,
        results: 1,
        select: 1,
        selectWhere: 1,
      };
      return { product, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getByFilter = async (
    filter: string
  ): Promise<{
    products: Product[];
    stats: Stats;
  }> => {
    try {
      const startGetByFilter = performance.now();
      const products = await this.productRepository.getByFilter(filter);
      const timeGetByFilter = performance.now() - startGetByFilter;
      const stats: Stats = {
        log: [
          { duration: timeGetByFilter, query: queries.GET_PRODUCTS_BY_FILTER },
        ],
        queries: 1,
        results: 1,
        select: 1,
        selectWhere: 1,
      };
      return { products, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default ProductService;
