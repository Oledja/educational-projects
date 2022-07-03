import { timeStamp } from "console";
import OpenweatherClient from "../clients/openweatherClient";
type weatherMainType = {
    temp: number,
    feels_like: number
}

type weatherDescription = {
    description: string
}

export type weatherType = {
    dt_txt: string,
    main: weatherMainType,
    weather: [weatherDescription]
}

export default class OpenweatherService {
    private openweather: OpenweatherClient = new OpenweatherClient();
    private weatherForecast: weatherType[];

    public async getWeatherForecastThreeHours(): Promise<string> {
        const weatherMap: Map<string, weatherType[]> = await this.groupWeatherByDate();
        return this.getWeatherForecast(weatherMap);

    }

    public async getWeatherForecastSixHours(): Promise<string> {
        let weatherMap: Map<string, weatherType[]> = await this.groupWeatherByDate();
        weatherMap = this.getSixHoursInterval(weatherMap);
        return this.getWeatherForecast(weatherMap);
    }

    private async groupWeatherByDate(): Promise<Map<string, weatherType[]>> {
        this.weatherForecast = await this.openweather.getCurrentWeatherForecast();
        let weatherMap: Map<string, weatherType[]> = new Map();

        this.weatherForecast.forEach(weather => {
            let date: string = weather.dt_txt.split(" ")[0];
            if (weatherMap.has(date)) {
                weatherMap.get(date)?.push(weather);
            } else {
                weatherMap.set(date, [weather]);
            }
        })
        return weatherMap;
    }

    private getSixHoursInterval(weatherMap: Map<string, weatherType[]>): Map<string, weatherType[]> {

        for (const key of weatherMap.keys()) {
            let weather: weatherType[] | undefined = weatherMap.get(key);
            if (weather) {
                weather = weather.filter(w => {
                    let time: string = w.dt_txt.split(" ")[1];
                    time = time.split(":")[0];
                    if (time === "03" || time === "09" || time === "15") {
                        return false;
                    }
                    return true; 
                })
            }
            if (weather) {
                weatherMap.set(key, weather);
            }
        }
        return weatherMap;
    }

    private async getWeatherForecast(weatherMap: Map<string, weatherType[]>): Promise<string> {
        let result: string = "Погода в Днепре:\n";
        for (const key of weatherMap.keys()) {
            result += `\n ${this.getWeekDay(key)}, ${new Date(key).getDate()} ${this.getMonth(key)}:\n` 
            weatherMap.get(key)?.forEach(w => {
                result += this.prepareWeather(w);
            })
        }
        return result;
    }

    private prepareWeather(weather: weatherType): string {
        const time: string = weather.dt_txt.split(" ")[1].substring(0, 5);
        const temp: string  = weather.main.temp >= 0 ? `+${weather.main.temp.toFixed(1)}°C` : `${weather.main.temp.toFixed(1)}°C`;
        const feelsLike = weather.main.feels_like >= 0 ? `+${weather.main.feels_like.toFixed(1)}°C` : `${weather.main.feels_like.toFixed(1)}°C`;
        const sky = weather.weather[0].description;
        return `   ${time}, ${temp}, ощущается: ${feelsLike}, ${sky}\n`;
    }

    private getWeekDay(date: string): string {
        const day: number = new Date(date).getDay();
        const days: string[] = ["воскресенье", "понедельник", "вторник", "среда",
         "четверг", "пятница", "суббота"];
        return days[day];
    }  
    
    private getMonth(date: string): string {
        const month: number = new Date(date).getMonth();
        const days: string[] = ["января", "февраля", "марта", "апреля",
         "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return days[month];
    }
}