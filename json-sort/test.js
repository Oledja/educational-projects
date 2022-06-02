const getAllAnswers = require('./main');
const {readFileSync} = require('fs');

let endp = new Array(readFileSync('./endpoints.txt', 'utf-8').split('\r\n'));

getAllAnswers(endp);