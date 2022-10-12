const transformVacations = employees => {
  let result = [];

  const fromatedEmployee = employees.map(empl => {
    return {
      userId: empl.user._id,
      name: empl.user.name,
      weekendDates: [{ startDays: empl.startDate, endDate: empl.endDate }],
    };
  });

  for (empl of fromatedEmployee) {
    let maybeNew = result.find(e => e.userId === empl.userId);

    if (!maybeNew) {
      result.push(empl);
    } else {
      maybeNew.weekendDates.push(empl.weekendDates[0]);
    }
  }
  return result;
};
module.exports = transformVacations;