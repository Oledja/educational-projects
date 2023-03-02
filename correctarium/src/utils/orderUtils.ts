import ReadOrder from "../interfaces/Order";

const END_WORK_HOURS = 19;
const START_WORK_HOURS = 10;
const MIN_WORK_TIME = 60;
const START_WORK_TIME = 30;
const MIN_CHARACTERS_COUNT = 1000;
const isWorkDay = (date: Date): boolean => {
  const day = date.getDay();
  return day < 6 && day > 0;
};

const isWorkHours = (date: Date): boolean => {
  const time = date.getHours();
  return time < END_WORK_HOURS && time >= START_WORK_HOURS;
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
  if (isWorkDay(date) && date.getHours() < START_WORK_HOURS)
    date.setHours(10, 0, 0);
  while (!isWorkDay(date) || date.getHours() >= END_WORK_HOURS) {
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
  let leadTime = count * (3600 / amountLetters);
  leadTime = Math.round(leadTime / 60 + START_WORK_TIME);
  leadTime = leadTime <= MIN_WORK_TIME ? MIN_WORK_TIME : leadTime;
  return leadTime * 60 * 1000 * mimetypeCoef;
};

const getPrice = (
  price: number,
  mimetypeCoef: number,
  count: number
): number => {
  if (count <= MIN_CHARACTERS_COUNT)
    return price * MIN_WORK_TIME * mimetypeCoef;
  return parseFloat((count * price * mimetypeCoef).toFixed(2));
};

const getDeadline = (date: Date, leadTime: number): Date => {
  if (!isWorkHours(date) || !isWorkDay(date)) date = getWorkDay(new Date(date));
  const workTime = getWorkTime(date);
  if (workTime >= leadTime) return new Date(date.getTime() + leadTime);
  const nextDate = getNextDay(date);
  const timeLeft = leadTime - workTime;
  return getDeadline(nextDate, timeLeft);
};

const prepareResponse = (
  totalPrice: number,
  leadTime: number,
  deadline: Date
): ReadOrder => {
  const timeToMinutes = leadTime / MIN_CHARACTERS_COUNT / 60;
  const workHours = Math.floor(timeToMinutes / 60);
  const workMinutes = Math.round(timeToMinutes - workHours * 60);
  return {
    totalPrice,
    leadTime: `${workHours} : ${workMinutes}`,
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
