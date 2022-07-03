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
const openweatherClient_1 = __importDefault(require("../clients/openweatherClient"));
class OpenweatherService {
    constructor() {
        this.openweather = new openweatherClient_1.default();
    }
    getWeatherForecastThreeHours() {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherMap = yield this.groupWeatherByDate();
            return this.getWeatherForecast(weatherMap);
        });
    }
    getWeatherForecastSixHours() {
        return __awaiter(this, void 0, void 0, function* () {
            let weatherMap = yield this.groupWeatherByDate();
            weatherMap = this.getSixHoursInterval(weatherMap);
            return this.getWeatherForecast(weatherMap);
        });
    }
    groupWeatherByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.weatherForecast = yield this.openweather.getCurrentWeatherForecast();
            let weatherMap = new Map();
            this.weatherForecast.forEach(weather => {
                var _a;
                let date = weather.dt_txt.split(" ")[0];
                if (weatherMap.has(date)) {
                    (_a = weatherMap.get(date)) === null || _a === void 0 ? void 0 : _a.push(weather);
                }
                else {
                    weatherMap.set(date, [weather]);
                }
            });
            return weatherMap;
        });
    }
    getSixHoursInterval(weatherMap) {
        for (const key of weatherMap.keys()) {
            let weather = weatherMap.get(key);
            if (weather) {
                weather = weather.filter(w => {
                    let time = w.dt_txt.split(" ")[1];
                    time = time.split(":")[0];
                    if (time === "03" || time === "09" || time === "15") {
                        console.log("fasle");
                        return false;
                    }
                    return true;
                });
            }
            if (weather) {
                weatherMap.set(key, weather);
            }
        }
        return weatherMap;
    }
    getWeatherForecast(weatherMap) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let result = "Погода в Днепре:\n";
            for (const key of weatherMap.keys()) {
                result += `\n ${this.getWeekDay(key)}, ${new Date(key).getDate()} ${this.getMonth(key)}:\n`;
                (_a = weatherMap.get(key)) === null || _a === void 0 ? void 0 : _a.forEach(w => {
                    result += this.prepareWeather(w);
                });
            }
            return result;
        });
    }
    prepareWeather(weather) {
        const time = weather.dt_txt.split(" ")[1].substring(0, 5);
        const temp = weather.main.temp >= 0 ? `+${weather.main.temp.toFixed(1)}°C` : `${weather.main.temp.toFixed(1)}°C`;
        const feelsLike = weather.main.feels_like >= 0 ? `+${weather.main.feels_like.toFixed(1)}°C` : `${weather.main.feels_like.toFixed(1)}°C`;
        const sky = weather.weather[0].description;
        return `   ${time}, ${temp}, ощущается: ${feelsLike}, ${sky}\n`;
    }
    getWeekDay(date) {
        const day = new Date(date).getDay();
        const days = ["воскресенье", "понедельник", "вторник", "среда",
            "четверг", "пятница", "суббота"];
        return days[day];
    }
    getMonth(date) {
        const month = new Date(date).getMonth();
        const days = ["января", "февраля", "марта", "апреля",
            "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return days[month];
    }
}
exports.default = OpenweatherService;
