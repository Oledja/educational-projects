import { readFileSync } from "fs";
import EmployeeVacation from "./interfaces/EmployeeVacation";
import RawEmployeeVacation from "./interfaces/RawEmployeeVacation";

const transform = (path: string): EmployeeVacation[] => {
  const vacations = readFileSync(path, "utf-8");
  const rawEmployeeVacations: RawEmployeeVacation[] = JSON.parse(vacations);
  let transformedVacations: EmployeeVacation[];
  const result: EmployeeVacation[] = [];

  transformedVacations = rawEmployeeVacations.map((empl) => {
    const {
      startDate,
      endDate,
      user: { _id: userId, name },
    } = empl;
    return {
      userId,
      name,
      weekendDates: [{ startDate: startDate, endDate: endDate }],
    };
  });

  transformedVacations.forEach((empl) => {
    const mayBeNew = result.find((e) => e.userId === empl.userId);
    if (mayBeNew) {
      mayBeNew.weekendDates.push(empl.weekendDates[0]);
    } else result.push(empl);
  });
  return result;
};

export default transform;
