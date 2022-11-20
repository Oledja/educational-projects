import SupplierRepository from "../repositories/SupplierRepository";

class SupplierService {
  supplierRepository = new SupplierRepository();

  getAll = async () => {
    const { rows } = await this.supplierRepository.getAll();
    return rows;
  };

  getById = async (id: string) => {
    const { rows } = await this.supplierRepository.getById(id);
    return rows;
  };
}

export default SupplierService;
