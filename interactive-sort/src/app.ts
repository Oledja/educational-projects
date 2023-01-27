import * as readline from "readline";
import { FIRST_QUESTION, SECOND_QUESTION } from "./question";

const isWord = (str: string) => {
  if (isNumber(str)) return false;
  return true;
};

const isNumber = (str: string) => {
  if (isNaN(parseInt(str))) return false;
  return true;
};

const ask = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const sortAndFilter = (words: string[], sortType: string) => {
  switch (sortType) {
    case "1":
      return words.filter((word) => isWord(word)).sort();
    case "2":
      return words
        .filter((word) => isNumber(word))
        .sort((num1, num2) => parseInt(num1) - parseInt(num2));
    case "3":
      return words
        .filter((word) => isNumber(word))
        .sort((num1, num2) => parseInt(num2) - parseInt(num1));
    case "4":
      return words
        .filter((word) => isWord(word))
        .sort((word1, word2) => word1.length - word2.length);
    case "5":
      const uniqWords = new Set();
      words
        .filter((word) => isWord(word))
        .forEach((word) => uniqWords.add(word));
      return Array.from(uniqWords);
    case "6":
      const uniqValues = new Set();
      words.forEach((word) => uniqValues.add(word));
      return Array.from(uniqValues);
    case "exit":
      return "exit";
    default:
      return "Inсorrect input";
  }
};

const start = async () => {
  while (true) {
    const result = await ask(FIRST_QUESTION);
    const words = result.split(" ");
    const choice = await ask(SECOND_QUESTION);
    if (choice === "exit") {
      return;
    }
    console.log(sortAndFilter(words, choice));
  }
};
start();
