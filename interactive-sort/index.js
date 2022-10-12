const { ask, sortAndFilter } = require("./util");
const { firstQuestion, secondQuestion } = require("./questions");

const start = async () => {
  while (true) {
    let words = await ask(firstQuestion);
    words = words.split(" ");
    const choice = await ask(secondQuestion);
    if (choice === "exit") {
      return;
    }
    console.log(await sortAndFilter(words, choice));
  }
};
start();

// man 22 apple table 100 93 18 apple nice grass smartphone 100293 go undertandable woman 341 43.5 man 111 204 Dnipro city
