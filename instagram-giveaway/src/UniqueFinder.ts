import { findAllUniqueValues, readDir } from "./utils/readDir";

class UniqueFinder {
  private files: string[][];

  constructor(dirPath: string) {
    this.files = readDir(dirPath);
  }

  uniqueValues = (): number => {
    return new Set(...this.files).size;
  };

  existInAllFiles = (): number => {
    let count = 0;
    const mapUniqueValues = findAllUniqueValues(this.files);
    for (const [, value] of mapUniqueValues) {
      if (value == 20) count++;
    }
    return count;
  };

  existInAtLeastTen = (): number => {
    let count = 0;
    const mapUniqueValues = findAllUniqueValues(this.files);
    for (const [, value] of mapUniqueValues) {
      if (value == 10) count++;
    }
    return count;
  };
}

export default UniqueFinder;
