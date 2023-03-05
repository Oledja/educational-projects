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
      const suppliers = await this.supplierRepository.getAll();
      const stats: Stats = {
        log: [queries.GET_ALL_SUPPLIERS],
        queries: 1,
        results: suppliers.length,
        select: 1,
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
      const supplier = await this.supplierRepository.getById(id);
      if (!supplier)
        throw new Error(`Supplier with id: <${id}> doesn't exists`);
      const stats: Stats = {
        log: [queries.GET_SUPPLIER_BY_ID],
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
