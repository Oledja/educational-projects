import UniqueFinder from "./UniqueFinder";
import * as dotenv from "dotenv";

dotenv.config();

const dirPath = process.env.DIR_PATH;
const uniqueFinder = new UniqueFinder(dirPath);

console.time("time");
console.log(`unique values: ${uniqueFinder.uniqueValues()}`);
console.timeEnd("time");
console.time("time");
console.log(`exist in all: ${uniqueFinder.existInAllFiles()}`);
console.timeEnd("time");
console.time("time");
console.log(`exist at least ten: ${uniqueFinder.existInAtLeastTen()}`);
console.timeEnd("time");
