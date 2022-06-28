/**
 * @param {string} question
 * @returns {Promise<string | null>}
 */
 const readline = require('readline');

function isWord(str) {
    if (isNumber(str)) {
        return false;
    }
    return true;
}

function isNumber(str) {
    const result = Number(str);
    if (isNaN(result)) {
        return false;
    }
    return true;
} 

async function ask(question) {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer)
      });
    });
  }

  function sortAndFilter(array, sortNum) {
    switch (sortNum) {
        case "1":
            return array
                .filter(word => isWord(word))
                .sort();
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
            let wordsSet = new Set();
            array
                .filter(a => isWord(a))
                .forEach(a => wordsSet.add(a));
            return Array.from(wordsSet);
        case "6":
            let allValuesSet = new Set();
            array.forEach(word => allValuesSet.add(word));
            return Array.from(allValuesSet);
        case "exit":
            return "exit";    
        default :
            return "Inсorrect input"    
    }
}

module.exports = {ask, sortAndFilter}