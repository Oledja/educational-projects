const _ = require('lodash');
const vacations = require('./vacations');

function transformVacations (employees) {
  let result = [];
  
  for (let i = 0; i < employees.length; i++) {
    let current = transformToNewFormat(employees[i]);
    let maybeNew = result.find(e => _.isEqual(e.userId, current.userId));
    if (!maybeNew) {
      result.push(current);
    } else {
      maybeNew.weekendDates.push(current.weekendDates[0]);
    }
  }
  return result;
}

function transformToNewFormat (employee){
  return {  userId: employee.user._id,
            name: employee.user.name,
            weekendDates: [
              {startDays: employee.startDate, endDate: employee.endDate}
            ]
          }
}

module.exports = transformVacations;


