import { timeStamp } from "console";
import OpenweatherClient from "../clients/OpenweatherClient";
import IOpenweatherResponse from "../interfaces/IOpenweatherResponse";

const openweather = new OpenweatherClient();
let weatherForecast: IOpenweatherResponse[];

class OpenweatherService {
  public async getWeatherForecastThreeHours(): Promise<string> {
    const weatherMap: Map<string, IOpenweatherResponse[]> =
      await groupWeatherByDate();
    return getWeatherForecast(weatherMap);
  }

  public async getWeatherForecastSixHours(): Promise<string> {
    let weatherMap: Map<string, IOpenweatherResponse[]> =
      await groupWeatherByDate();
    weatherMap = getSixHoursInterval(weatherMap);
    return getWeatherForecast(weatherMap);
  }
}
const groupWeatherByDate = async (): Promise<
  Map<string, IOpenweatherResponse[]>
> => {
  weatherForecast = await openweather.getCurrentWeatherForecast();
  const weatherMap: Map<string, IOpenweatherResponse[]> = new Map();

  weatherForecast.forEach((weather) => {
    const date: string = weather.dt_txt.split(" ")[0];
    if (weatherMap.has(date)) {
      weatherMap.get(date)!.push(weather);
    } else weatherMap.set(date, [weather]);
  });
  return weatherMap;
};

const getSixHoursInterval = (
  weatherMap: Map<string, IOpenweatherResponse[]>
): Map<string, IOpenweatherResponse[]> => {
  weatherMap.forEach((_v, key) => {
    let weather: IOpenweatherResponse[] | undefined = weatherMap.get(key);
    if (weather) {
      weather = weather.filter((w) => {
        let time: string = w.dt_txt.split(" ")[1];
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

const getWeatherForecast = async (
  weatherMap: Map<string, IOpenweatherResponse[]>
): Promise<string> => {
  let result: string = "Погода в Днепре:\n";
  weatherMap.forEach((_v, key) => {
    result += `\n ${getWeekDay(key)}, ${new Date(key).getDate()} ${getMonth(
      key
    )}:\n`;
    weatherMap.get(key)?.forEach((w) => {
      result += prepareWeather(w);
    });
  });
  return result;
};

const prepareWeather = (weather: IOpenweatherResponse): string => {
  const time: string = weather.dt_txt.split(" ")[1].substring(0, 5);
  const temp: string =
    weather.main.temp >= 0
      ? `+${weather.main.temp.toFixed(1)}°C`
      : `${weather.main.temp.toFixed(1)}°C`;
  const feelsLike =
    weather.main.feels_like >= 0
      ? `+${weather.main.feels_like.toFixed(1)}°C`
      : `${weather.main.feels_like.toFixed(1)}°C`;
  const sky = weather.weather[0].description;
  return `   ${time}, ${temp}, ощущается: ${feelsLike}, ${sky}\n`;
};

const getWeekDay = (date: string): string => {
  const day: number = new Date(date).getDay();
  const days: string[] = [
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

const getMonth = (date: string): string => {
  const month: number = new Date(date).getMonth();
  const days: string[] = [
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

export default OpenweatherService;
