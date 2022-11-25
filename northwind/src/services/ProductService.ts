import ProductReposotory from "../repositories/ProductRepository";
import MetricService from "./MetricsService";
import { errorHandler } from "../errors/errorHandler";
import * as queries from "../queries/Queries";

class ProductService {
  private productRepository = new ProductReposotory();

  public getAll = async () => {
    try {
      const { rows, rowCount } = await this.productRepository.getAll();
      MetricService.addSelectQuery(rowCount, queries.GET_ALL_PRODUCTS);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getById = async (id: string) => {
    try {
      const { rows, rowCount } = await this.productRepository.getById(id);
      MetricService.addWhereQuery(rowCount, queries.GET_PRODUCTS_BY_ID);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  public getByFilter = async (filter: string) => {
    try {
      const { rows, rowCount } = await this.productRepository.getByFilter(
        filter
      );
      MetricService.addWhereQuery(rowCount, queries.GET_PRODUCTS_BY_FILTER);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };
}

export default ProductService;
