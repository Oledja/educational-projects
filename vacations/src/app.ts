import transform from "./TransformVacation";
import * as dotenv from "dotenv";

dotenv.config();

const filePath = process.env.FILE_PATH;
const result = transform(filePath);
console.log(result);
