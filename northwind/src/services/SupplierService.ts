import SupplierRepository from "../repositories/SupplierRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Supplier from "../interfices/Supplier";
import * as queries from "../utils/queries";
import Stats from "../interfices/Stats";

class SupplierService {
  supplierRepository = new SupplierRepository();

  getAll = async (): Promise<{
    stats: Stats;
    suppliers: Supplier[];
  }> => {
    try {
      const startGetAll = performance.now();
      const suppliers = await this.supplierRepository.getAll();
      const timeGetAll = performance.now() - startGetAll;
      const startNumOfSuppliers = performance.now();

      const { total } = await this.supplierRepository.getNumberOfSuppliers();
      const timeNumOfSuppliers = performance.now() - startNumOfSuppliers;

      const stats: Stats = {
        log: [
          {
            duration: timeNumOfSuppliers,
            query: queries.GET_NUMBER_OF_SUPPLIERS,
          },
          { duration: timeGetAll, query: queries.GET_ALL_SUPPLIERS },
        ],
        queries: 2,
        results: total,
        select: 2,
      };
      return { suppliers, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getById = async (
    id: string
  ): Promise<{
    stats: Stats;
    supplier: Supplier;
  }> => {
    try {
      const startGetById = performance.now();
      const supplier = await this.supplierRepository.getById(id);
      const timeGetById = performance.now() - startGetById;
      if (!supplier)
        throw new Error(`Supplier with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [{ duration: timeGetById, query: queries.GET_SUPPLIER_BY_ID }],
        queries: 1,
        results: 1,
        select: 1,
        selectWhere: 1,
      };
      return { supplier, stats };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default SupplierService;
