type Weekend = {
  startDate: Date;
  endDate: Date;
};

interface EmployeeVacation {
  userId: string;
  name: string;
  weekendDates: Weekend[];
}

export default EmployeeVacation;
