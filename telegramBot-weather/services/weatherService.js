const { getWeatherForecast } = require("../clients/weather-client")

async function showWeatherSixHoursInterval() {
    let weatherMap = await getWeather();
    weatherMap = filterTimeIntervalToSixHours(weatherMap);
    return prepareWeatherForecast(weatherMap);
}

async function showWeatherThreeHoursInterval() {
    let weatherMap = await getWeather();
    return prepareWeatherForecast(weatherMap);
}

function groupWeatherByDate(weatherForecast) {
    const weatherMap = new Map();
    for (let i = 0; i < weatherForecast.length; i++) {
        let weather = parseWeather(weatherForecast[i]);
        let date = weatherForecast[i].dt_txt.split(" ")[0];
        if (weatherMap.has(date)) {
            weatherMap.get(date).push(weather);
        } else {
            weatherMap.set(date, [weather]);
        }
    }
    return weatherMap;
}

function parseWeather(weather) {
    return {
        time: weather.dt_txt.split(" ")[1],
        temp: Math.round(weather.main.temp),
        feelsLike: Math.round(weather.main.feels_like),
        sky: weather.weather[0].description
    }
}

async function prepareWeatherForecast(weatherMap) {
    let result = "Погода в Днепре: \n\n";
    for (let key of weatherMap.keys()) {
        weatherOnDay = weatherMap.get(key);
        let weekDay = getWeekDay(key)
        let day = new Date(key).getDate();
        let month = getMonth(key);
        result += `${weekDay}, ${day} ${month}: \n`;
        for (let i = 0; i < weatherOnDay.length; i++) {
            let weatherStr = prepareWeather(weatherOnDay[i]);
            result += `  ${weatherStr} \n`;
        }
        result += "\n";
    }
    return result;
}


function filterTimeIntervalToSixHours(weatherMap) {
    for (let key of weatherMap.keys()) {
        let weatherOnDay = weatherMap.get(key);
        weatherOnDay = weatherOnDay.filter(w => isSixHoursInterval(w.time));
        weatherMap.set(key, weatherOnDay);
    }
    return weatherMap;

}

function prepareWeather(weather) {
    const time = weather.time.substring(0, 5);
    const temp = weather.temp >= 0 ? `+${weather.temp}°C` : `${weather.temp}°C`;
    const feelsLike = weather.feelsLike >= 0 ? `+${weather.feelsLike}°C` : `${weather.feelsLike}°C`;
    const sky = weather.sky;
    return `${time}, ${temp}, ${feelsLike}, ${sky}`;
}

module.exports = {groupWeatherByDate}

function isSixHoursInterval(time) {
    if (time.split(":")[0] == "03" 
            || time.split(":")[0] == "09" 
                || time.split(":")[0] == "15") {
        return false;
    }
    return true;
}
async function getWeather() {
    const weatherForecast = await getWeatherForecast();
    return weatherMap = groupWeatherByDate(weatherForecast);
}

function getWeekDay(date) {
    const day = new Date(date).getDate();
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[day];
}  

function getMonth(date) {
    const month = new Date(date).getMonth();
    const days = ['января', 'февраля', 'марта', 'апреля',
     'мая', 'июня', 'июля', "августа", "сентября", "октября", "ноября", "декабря"];
    return days[month];
}

module.exports = {showWeatherThreeHoursInterval, showWeatherSixHoursInterval}