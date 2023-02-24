import { readFileSync, existsSync, readdirSync } from "fs";

class UniqueFinder {
  uniqueValues = (dirPath: string) => {
    const files = this.readDir(dirPath);
    const allUniqueValues = new Set();
    for (let path of files) {
      this.readFileAndSplit(path).forEach((values) =>
        allUniqueValues.add(values)
      );
    }
    const { size: result } = allUniqueValues;
    return result;
  };

  existInAllFiles = (dirPath: string): number => {
    const files = this.readDir(dirPath);
    let mapUniqueValues = this.findAllUniqueValues(files);
    let count = 0;
    for (const [, value] of mapUniqueValues) {
      if (value == 20) count++;
    }
    return count;
  };

  existInAtLeastTen = (dirPath: string): number => {
    const files = this.readDir(dirPath);
    const mapUniqueValues = this.findAllUniqueValues(files);
    let count = 0;

    for (const [, value] of mapUniqueValues) {
      if (value >= 10) count++;
    }
    return count;
  };

  private findAllUniqueValues = (paths: string[]) => {
    const map = new Map<string, number>();

    paths.forEach((path) => {
      const unique = this.uniqueValuesInFile(path);
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

  private uniqueValuesInFile = (path: string): string[] => {
    const values = this.readFileAndSplit(path);
    const unique = new Set(values);
    return [...unique];
  };

  private readFileAndSplit = (path: string): string[] => {
    if (!existsSync(path)) throw new Error("File doesn't exist");
    return readFileSync(path, "utf-8").split("\n");
  };

  private readDir = (dirPath: string): string[] => {
    let files = readdirSync(dirPath);
    files = files.map((name) => dirPath + "\\" + name);
    return files;
  };
}

export default UniqueFinder;
