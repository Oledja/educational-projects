import * as dotenv from "dotenv";
import getAllResponses from "./JsonSort";
import { readFileSync } from "fs";

dotenv.config();

const filePath = process.env.FILE_PATH;
const endpoints: string[] = readFileSync(filePath, "utf-8").split("\r\n");
getAllResponses(endpoints);
