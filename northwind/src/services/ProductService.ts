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
      const products = await this.productRepository.getAll();
      const stats: Stats = {
        log: [queries.GET_ALL_PRODUCTS],
        queries: 1,
        results: products.length,
        select: 1,
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
      const product = await this.productRepository.getById(id);
      if (!product) throw new Error(`Product with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [queries.GET_PRODUCTS_BY_ID],
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
      const products = await this.productRepository.getByFilter(filter);
      const stats: Stats = {
        log: [queries.GET_PRODUCTS_BY_FILTER],
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
