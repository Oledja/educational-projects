import path from "path";
import { readFileSync, existsSync, readdirSync } from "fs";

const readFileAndSplit = (path: string): string[] => {
  if (!existsSync(path)) throw new Error("File doesn't exist");
  return readFileSync(path, "utf-8").split("\n");
};

const uniqueValuesInFile = (file: string[]): string[] => {
  return Array.from(new Set(file));
};

const readDir = (dirPath: string): string[][] => {
  let files = readdirSync(dirPath);
  return files.map((name) => {
    const filePath = path.join(dirPath, name);
    return readFileAndSplit(filePath);
  });
};

const findAllUniqueValues = (files: string[][]) => {
  const map = new Map<string, number>();
  files.forEach((path) => {
    const unique = uniqueValuesInFile(path);
    unique.forEach((val) => {
      if (!map.has(val)) {
        map.set(val, 1);
      } else {
        map.set(val, map.get(val)! + 1);
      }
    });
  });

  return map;
};

export { readDir, findAllUniqueValues, uniqueValuesInFile };
