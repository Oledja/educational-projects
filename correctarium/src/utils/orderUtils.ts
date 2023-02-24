import ReadOrder from "../interfaces/ReadOrder";

const isWorkDay = (date: Date): boolean => {
  const day = date.getDay();
  return day < 6 && day > 0;
};

const isWorkHours = (date: Date): boolean => {
  const time = date.getHours();
  return time < 19 && time >= 10;
};

const getNextDay = (date: Date): Date => {
  date.setDate(date.getDate() + 1);
  date.setHours(10, 0, 0);
  return new Date(date);
};

const getWorkTime = (date: Date): number => {
  const endTime = new Date(date).setHours(19, 0, 0);
  return endTime - date.getTime();
};

const getWorkDay = (date: Date): Date => {
  if (isWorkDay(date) && date.getHours() < 10) date.setHours(10, 0, 0);
  while (!isWorkDay(date) || date.getHours() >= 19) {
    date.setDate(date.getDate() + 1);
    date.setHours(10, 0, 0);
  }
  return new Date(date);
};

const getTime = (
  amountLetters: number,
  mimetypeCoef: number,
  count: number
): number => {
  const minTime = 60;
  const startTime = 30;
  let time = count * (3600 / amountLetters);
  time = Math.round(time / 60 + startTime);
  time = time <= minTime ? minTime : time;
  return time * 60 * 1000 * mimetypeCoef;
};

const getPrice = (
  languageCoef: number,
  mimetypeCoef: number,
  count: number
): number => {
  const minCount = 1000;
  if (count <= minCount) return languageCoef * minCount * mimetypeCoef;
  return parseFloat((count * languageCoef * mimetypeCoef).toFixed(2));
};

const getDeadline = (date: Date, time: number): Date => {
  if (!isWorkHours(date) || !isWorkDay(date)) date = getWorkDay(new Date(date));
  const workTime = getWorkTime(date);
  if (workTime >= time) return new Date(date.getTime() + time);
  const nextDate = getNextDay(date);
  const timeLeft = time - workTime;
  return getDeadline(nextDate, timeLeft);
};

const prepareResponse = (
  price: number,
  time: number,
  deadline: Date
): ReadOrder => {
  const timeToMinutes = time / 1000 / 60;
  const workHours = Math.floor(timeToMinutes / 60);
  const workMinutes = Math.round(timeToMinutes - workHours * 60);
  return {
    price,
    time: workHours + ":" + workMinutes,
    deadline: deadline.getTime(),
    deadline_date: deadline
      .toLocaleString()
      .split(".")
      .join("/")
      .split(",")
      .join(""),
  };
};

export {
  isWorkHours,
  getNextDay,
  getWorkTime,
  getWorkDay,
  getTime,
  isWorkDay,
  getPrice,
  getDeadline,
  prepareResponse,
};
