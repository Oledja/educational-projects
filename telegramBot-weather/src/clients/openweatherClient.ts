import axios from "axios";
import OpenweatherResponse from "../interfaces/OpenweatherResponse";
import OpenweatherRawResponse from "../interfaces/OpenweatherRawResponse";
import * as dotenv from "dotenv";

dotenv.config();

class OpenweatherClient {
  private OPENWEATHER_URL = process.env.OPENWEATHER_URL;
  async getCurrentWeatherForecast(): Promise<OpenweatherResponse[]> {
    const {
      data: { list: weatherResponse },
    } = await axios.get<OpenweatherRawResponse>(this.OPENWEATHER_URL);
    return weatherResponse;
  }
}

export default OpenweatherClient;
