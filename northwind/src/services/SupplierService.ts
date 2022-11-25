import SupplierRepository from "../repositories/SupplierRepository";
import MetricService from "./MetricsService";
import { errorHandler } from "../errors/errorHandler";
import * as queries from "../queries/Queries";

class SupplierService {
  supplierRepository = new SupplierRepository();

  getAll = async () => {
    try {
      const { rows, rowCount } = await this.supplierRepository.getAll();
      MetricService.addSelectQuery(rowCount, queries.GET_ALL_SUPPLIERS);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };

  getById = async (id: string) => {
    try {
      const { rows, rowCount } = await this.supplierRepository.getById(id);
      MetricService.addWhereQuery(rowCount, queries.GET_SUPPLIER_BY_ID);
      return rows;
    } catch (err) {
      return errorHandler(err);
    }
  };
}

export default SupplierService;
