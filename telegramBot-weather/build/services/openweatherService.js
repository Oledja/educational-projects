"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OpenweatherClient_1 = __importDefault(require("../clients/OpenweatherClient"));
const openweather = new OpenweatherClient_1.default();
let weatherForecast;
class OpenweatherService {
    getWeatherForecastThreeHours() {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherMap = yield groupWeatherByDate();
            return getWeatherForecast(weatherMap);
        });
    }
    getWeatherForecastSixHours() {
        return __awaiter(this, void 0, void 0, function* () {
            let weatherMap = yield groupWeatherByDate();
            weatherMap = getSixHoursInterval(weatherMap);
            return getWeatherForecast(weatherMap);
        });
    }
}
const groupWeatherByDate = () => __awaiter(void 0, void 0, void 0, function* () {
    weatherForecast = yield openweather.getCurrentWeatherForecast();
    const weatherMap = new Map();
    weatherForecast.forEach((weather) => {
        const date = weather.dt_txt.split(" ")[0];
        if (weatherMap.has(date)) {
            weatherMap.get(date).push(weather);
        }
        else
            weatherMap.set(date, [weather]);
    });
    return weatherMap;
});
const getSixHoursInterval = (weatherMap) => {
    weatherMap.forEach((_v, key) => {
        let weather = weatherMap.get(key);
        if (weather) {
            weather = weather.filter((w) => {
                let time = w.dt_txt.split(" ")[1];
                time = time.split(":")[0];
                if (time === "03" || time === "09" || time === "15") {
                    return false;
                }
                return true;
            });
        }
        if (weather) {
            weatherMap.set(key, weather);
        }
    });
    return weatherMap;
};
const getWeatherForecast = (weatherMap) => __awaiter(void 0, void 0, void 0, function* () {
    let result = "Погода в Днепре:\n";
    weatherMap.forEach((_v, key) => {
        var _a;
        result += `\n ${getWeekDay(key)}, ${new Date(key).getDate()} ${getMonth(key)}:\n`;
        (_a = weatherMap.get(key)) === null || _a === void 0 ? void 0 : _a.forEach((w) => {
            result += prepareWeather(w);
        });
    });
    return result;
});
const prepareWeather = (weather) => {
    const time = weather.dt_txt.split(" ")[1].substring(0, 5);
    const temp = weather.main.temp >= 0
        ? `+${weather.main.temp.toFixed(1)}°C`
        : `${weather.main.temp.toFixed(1)}°C`;
    const feelsLike = weather.main.feels_like >= 0
        ? `+${weather.main.feels_like.toFixed(1)}°C`
        : `${weather.main.feels_like.toFixed(1)}°C`;
    const sky = weather.weather[0].description;
    return `   ${time}, ${temp}, ощущается: ${feelsLike}, ${sky}\n`;
};
const getWeekDay = (date) => {
    const day = new Date(date).getDay();
    const days = [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
    ];
    return days[day];
};
const getMonth = (date) => {
    const month = new Date(date).getMonth();
    const days = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    return days[month];
};
exports.default = OpenweatherService;
