const axios = require('axios').default;
const endpoint = require("../config/config");

async function getWeatherForecast() {
    return axios.get(endpoint.dnepr)
        .then(function(response) {
            return response.data.list;
        })
}

module.exports = { getWeatherForecast }
