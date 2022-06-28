const {ask, sortAndFilter} = require("./util")

const firstQuestion = "Enter some words separated through space: ";
const secondQuestion = `How wold you like to sort values?
1. Sort words alphabetically.
2. Show digities from the smallest.
3. Show digities from the bigest.
4. Words by quantity of letters
5. Show only unique words
6. Show only unique values
                            
Select (1 - 6 or "exit" for EXIT) and press ENTER: `;

(async () => {
    while (true){
        let userWords = await ask(firstQuestion);
        userWords = userWords.split(" ");
        let userChoice = await ask(secondQuestion);
        if (userChoice === "exit") {
            return;
        }
        console.log(await sortAndFilter(userWords, userChoice));
    }
})();
// man 22 apple table 100 93 18 apple nice grass smartphone 100293 go undertandable woman 341 43.5 man 111 204 Dnipro city

