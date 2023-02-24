import * as dotenv from "dotenv";
import getAllResponses from "./JsonSort";
import { readFileSync } from "fs";

dotenv.config();

const FILE_PATH = process.env.FILE_PATH;
const endpoints: string[] = readFileSync(FILE_PATH, "utf-8").split("\r\n");
getAllResponses(endpoints);
