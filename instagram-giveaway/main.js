const fs = require("fs");

const uniqueValues = (files) => {
  const allUniqueValues = new Set();
  for (let file of files) {
    readFileAndSplit(file).forEach((element) => allUniqueValues.add(element));
  }
  return allUniqueValues.size;
};

const existInAllFiles = (files) => {
  let mapUniqueValues = findAllUniqueValues(files);
  let count = 0;

  for (const [, value] of mapUniqueValues) {
    if (value == 20) count++;
  }
  return count;
};

const existInAtLeastTen = (files) => {
  const mapUniqueValues = findAllUniqueValues(files);
  let count = 0;

  for (const [, value] of mapUniqueValues) {
    if (value >= 10) count++;
  }
  return count;
};

const findAllUniqueValues = (files) => {
  const map = new Map();

  files.forEach((file) => {
    let unique = uniqueValuesInFile(file);
    for (const val of unique) {
      if (!map.has(val)) {
        map.set(val, 1);
      } else {
        map.set(val, map.get(val) + 1);
      }
    }
  });
  return map;
};

const uniqueValuesInFile = (file) => {
  let allValues = readFileAndSplit(file);
  return new Set(allValues);
};

const readFileAndSplit = (path) => {
  try {
    if (fs.existsSync(path)) return fs.readFileSync(path, "utf-8").split("\n");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uniqueValues, existInAllFiles, existInAtLeastTen };