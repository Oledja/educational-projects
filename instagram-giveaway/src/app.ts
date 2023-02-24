import UniqueFiner from "./UniqueFinder";
import { readdirSync } from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const DIR_PATH = process.env.DIR_PATH;
const uf = new UniqueFiner();

console.log("------------------------");
console.log("uniqueValues");
console.time("time");
console.log("result: " + uf.uniqueValues(DIR_PATH));
console.timeEnd("time");
console.log("------------------------");
console.log("existInAllFiles");
console.time("time");
console.log("result: " + uf.existInAllFiles(DIR_PATH));
console.timeEnd("time");
console.log("------------------------");
console.log("existInAtLeastTen");
console.time("time");
console.log("result: " + uf.existInAtLeastTen(DIR_PATH));
console.timeEnd("time");
