import {
  getNextDay,
  isWorkHours,
  isWorkDay,
  getWorkDay,
  getWorkTime,
  prepareResponse,
  getDeadline,
  getTime,
  getPrice,
} from "../src/utils/orderUtils";

test("getNextDay returns next day 10:00:00 am", () => {
  const date = new Date("2017-01-26");
  const nextDate = getNextDay(new Date("2017-01-26"));
  expect(nextDate.getFullYear()).toBe(date.getFullYear());
  expect(nextDate.getMonth()).toBe(date.getMonth());
  expect(nextDate.getDate()).toBe(date.getDate() + 1);
  expect(nextDate.getHours()).toBe(10);
  expect(nextDate.getMinutes()).toBe(0);
  expect(nextDate.getSeconds()).toBe(0);
});

test("isWorkHours returns true during work hours, (work hours 10 - 19)", () => {
  const date = new Date(2017, 1, 26, 9, 0, 0, 0);
  expect(isWorkHours(date)).toBeFalsy(); // 9 am
  date.setHours(date.getHours() + 1);
  expect(isWorkHours(date)).toBeTruthy(); // 10 am
  date.setHours(date.getHours() + 8);
  expect(isWorkHours(date)).toBeTruthy(); // 18 pm
  date.setHours(date.getHours() + 1);
  expect(isWorkHours(date)).toBeFalsy(); // 19 pm
});

test("isWorkDay returns true if the day is working", () => {
  expect(isWorkDay(new Date(2017, 1, 6, 9, 0, 0, 0))).toBeTruthy(); // MON
  expect(isWorkDay(new Date(2017, 1, 10, 9, 0, 0, 0))).toBeTruthy(); // FRI
  expect(isWorkDay(new Date(2017, 1, 11, 9, 0, 0, 0))).toBeFalsy(); // SAT
  expect(isWorkDay(new Date(2017, 1, 12, 9, 0, 0, 0))).toBeFalsy(); // SUN
});

test("getWorkDay returns nearest working day", () => {
  expect(getWorkDay(new Date(2017, 1, 6, 9, 0, 0, 0)).getDate()).toBe(6);
  expect(getWorkDay(new Date(2017, 1, 11, 9, 0, 0, 0)).getDate()).toBe(13);
});

test("getWorkTime returns remaining working time of the current day", () => {
  expect(getWorkTime(new Date(2017, 1, 6, 10, 0, 0, 0))).toBe(32400000);
  expect(getWorkTime(new Date(2017, 1, 6, 18, 0, 0, 0))).toBe(3600000);
});

test("prepareResponse converts data to json for response", () => {
  const response = {
    price: 200,
    time: "1:0",
    deadline: 1486720800000,
    deadline_date: "10/02/2017 12:00:00",
  };
  expect(
    prepareResponse(200, 3600000, new Date(2017, 1, 10, 12, 0, 0, 0))
  ).toEqual(response);
});

test("getDeadline", () => {
  const date = new Date(2017, 1, 3, 7, 0, 0, 0); // 7 am
  const time = 3600000; // 1 hour
  const deadline = getDeadline(date, time);
  expect(deadline.getHours()).toBe(11);

  const date1 = new Date(2017, 1, 3, 19, 0, 0, 0);
  const time1 = 7200000; // 2 hours
  const deadline1 = getDeadline(date1, time1); // FRI 19 pm
  expect(deadline1.getHours()).toBe(12); // 12 am
  expect(deadline1.getDay()).toBe(1); //MON
});

test("getTime calculates time to work", () => {
  expect(getTime(333, 1, 5)).toBe(3600000); // min time
  expect(getTime(1333, 1.2, 5)).toBe(4320000); // min time +20%
  expect(getTime(333, 1, 666)).toBe(9000000);
  expect(getTime(1333, 1, 2666)).toBe(9000000);
  expect(getTime(1333, 1.2, 2666)).toBe(10800000);
});

test("gePrice", () => {
  expect(getPrice(0.05, 1, 1000)).toBe(50);
  expect(getPrice(0.05, 1, 1001)).toBe(50.05);
  expect(getPrice(0.12, 1.2, 2000)).toBe(288);
});

test("calkSumAndTime main method returns response in json", () => {});
