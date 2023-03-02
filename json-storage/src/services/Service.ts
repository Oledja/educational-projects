import ModelResponse from "../interfaces/ModelResponse";
import Repository from "../repositoties/Repository";
import getErrorMessage from "../utils/getErrorMessage";

class Service {
  private repository = new Repository();

  get = async (route: string): Promise<ModelResponse | null> => {
    try {
      const result = await this.repository.get(route);
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  save = async (route: string, data: string) => {
    try {
      const ifExist = await this.get(route);
      if (!ifExist) {
        await this.repository.save(route, data);
      } else throw new Error(`Route ${route} already used`);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default Service;
