import DataModel from "../models/DataModel";
import DataModelResponse from "../interfaces/DataModelResponse";

class DataRepository {
  private dataRepo = DataModel;

  getData = async (route: string): Promise<DataModelResponse | null> => {
    const result: DataModelResponse | null = await this.dataRepo.findOne({
      route,
    });
    return result;
  };

  saveData = async (route: string, data: string) => {
    await new DataModel({ route, data }).save();
  };
}
export default DataRepository;
