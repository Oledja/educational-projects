import axios from "axios";
import config from "../config/config";

export default class MonobankClient {
    public async getCurrentExchangeRate(): Promise<any> {
        return axios.get(config.monobank.endpoint) 
            .then(function(response) {
                return response.data;
            }
    )}
}

