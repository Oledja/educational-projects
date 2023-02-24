import DataModelResponse from "../interfaces/DataModelResponse";
import DataRepository from "../repositoties/DataRepository";
import getErrorMessage from "../utils/getErrorMessage";

class DataService {
  private dataRepository = new DataRepository();

  getData = async (route: string): Promise<DataModelResponse | null> => {
    try {
      const result = await this.dataRepository.getData(route);
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  saveData = async (route: string, data: string) => {
    try {
      const ifExist = await this.getData(route);
      if (!ifExist) {
        await this.dataRepository.saveData(route, data);
      } else throw new Error(`Route ${route} already used`);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default DataService;
