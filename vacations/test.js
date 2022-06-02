const {readFileSync, writeFileSync} = require('fs');
const transformVacations = require('./main');

const rawVacations = readFileSync('./vacations.json');
const vacationsJson = JSON.parse(rawVacations);

let newVacations = transformVacations(vacationsJson);
writeFileSync('new-vacations.json', JSON.stringify(newVacations), 'utf-8');

const rawNewVacations = readFileSync('./new-vacations.json');
const newVacationsJson = JSON.parse(rawNewVacations);
console.log(newVacationsJson);

