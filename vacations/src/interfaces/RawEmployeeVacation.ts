interface RawEmployeeVacation {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  usedDays: number;
  status: string;
  startDate: Date;
  endDate: Date;
}

export default RawEmployeeVacation;
