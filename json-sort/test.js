const { readFileSync } = require('fs');
const getAllResponses = require('./main');
const axios = require("axios").default;

let endpoints = readFileSync('./endpoints.txt', 'utf-8').split('\r\n');
const res = getAllResponses(endpoints);