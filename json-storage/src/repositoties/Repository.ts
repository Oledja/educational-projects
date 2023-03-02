import ModelResponse from "../interfaces/ModelResponse";
import Model from "../models/Model";

class Repository {
  private repo = Model;

  get = async (route: string): Promise<ModelResponse | null> => {
    const result: ModelResponse | null = await this.repo.findOne({
      route,
    });
    return result;
  };

  save = async (route: string, data: string) => {
    await new Model({ route, data }).save();
  };
}
export default Repository;
