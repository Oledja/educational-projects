import axios from "axios";
import config from "../config/config";

export default class PrivatbankClient {
    public async getCurrentExchangeRate(): Promise<any> {
        return axios.get(config.privatbank.endpoint) 
            .then(function(response) {
                return response.data;
            }
    )}        
}
