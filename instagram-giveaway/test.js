const { readdirSync } = require("fs");
const { uniqueValues, existInAllFiles, existInAtLeastTen } = require("./main");

const fileNames = readdirSync("./sources");
const files = fileNames.map((name) => "sources/" + name);

console.log("------------------------");
console.log("uniqueValues");
console.time("time");
console.log("result: " + uniqueValues(files));
console.timeEnd("time");
console.log("------------------------");
console.log("existInAllFiles");
console.time("time");
console.log("result: " + existInAllFiles(files));
console.timeEnd("time");
console.log("------------------------");
console.log("existInAtLeastTen");
console.time("time");
console.log("result: " + existInAtLeastTen(files));
console.timeEnd("time");