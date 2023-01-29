import * as readline from "readline";
import { FIRST_QUESTION, SECOND_QUESTION } from "./question";
import { sortAndFilter } from "./helper";

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
