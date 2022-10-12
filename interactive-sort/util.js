const readline = require("readline");

const isWord = str => {
  if (isNumber(str)) return false;
  return true;
};

const isNumber = str => {
  if (isNaN(parseInt(str))) return false;
  return true;
};

const ask = async question => {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
};

const sortAndFilter = (array, sortNum) => {
  switch (sortNum) {
    case "1":
      return array.filter(word => isWord(word)).sort();
    case "2":
      return array
        .filter(word => isNumber(word))
        .sort((num1, num2) => num1 - num2);
    case "3":
      return array
        .filter(word => isNumber(word))
        .sort((num1, num2) => num2 - num1);
    case "4":
      return array
        .filter(word => isWord(word))
        .sort((word1, word2) => word1.length - word2.length);
    case "5":
      const uniqWords = new Set();
      array
        .filter(word => isWord(word))
        .forEach(word => uniqWords.add(word));
      return Array.from(uniqWords);
    case "6":
      const uniqValues = new Set();
      array.forEach(word => uniqValues.add(word));
      return Array.from(uniqValues);
    case "exit":
      return "exit";
    default:
      return "Inсorrect input";
  }
};

module.exports = { ask, sortAndFilter };
