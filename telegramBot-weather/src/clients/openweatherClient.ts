import axios from "axios";
import config from "../config/config";

export default class OpenweatherClient {
    async getCurrentWeatherForecast(): Promise<any> {
        return axios.get(config.openweather.endpoint) 
            .then(function(response) {
                return response.data.list;
            }
    )}
}




