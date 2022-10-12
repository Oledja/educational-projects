import axios from "axios";
import IOpenweatherResponse from "../interfaces/IOpenweatherResponse";
import * as dotenv from "dotenv";
dotenv.config();

class OpenweatherClient {
  async getCurrentWeatherForecast(): Promise<IOpenweatherResponse[]> {
    const {
      data: { list: weatherResult },
    } = await axios.get(process.env.OPENWEATHER_URL);
    return weatherResult;
  }
}

export default OpenweatherClient;
