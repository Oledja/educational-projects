import transform from "./TransformVacation";
import * as dotenv from "dotenv";

dotenv.config();

const FILE_PATH = process.env.FILE_PATH;
const result = transform(FILE_PATH);
console.log(result);
