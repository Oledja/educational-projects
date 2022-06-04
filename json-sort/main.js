const fetch = require('node-fetch');

async function repeatedRequests(url) {
    let attempts = 1;
    let answer = await fetch(url);
    
    
    while (answer.status != 200 && attempts < 3) {
        answer = await fetch(url);
        attempts++;
    }
    if (answer.status == 200) {
        return answer;
    } else {
        console.log(`Error: ${answer.url}: returned status code - ${answer.code}`);
    }
}

async function getAllAnswers(urls) {
    let result = new Map();
    
    for (let url of urls[0]) {
            await repeatedRequests(url)
                .then(answer => answer.json())
                .then(json =>  getPropertyValue(json, 'isDone'))
                .then(propValue => {
                    result.set(url, propValue);
                    console.log(`${url}: isDone - ${propValue}`);
                }).catch(Error);
    }
    showResult(result);
}

function getPropertyValue(json, propertyName) {
    for (let prop in json) {
        if (prop == propertyName) {
            return json[prop];
        }else if (typeof json[prop] === 'object') {
            let result = getPropertyValue(json[prop], propertyName);
            if (result != undefined) {
                return result;
            } 
        }
    }   
}

function showResult(result) {
    let trueRes = 0;
    let falseRes = 0;
    for (let [, value] of result) {
        value === true ? trueRes++ : falseRes++;
    }

    console.log(`\nЗначений True: ${trueRes}, \nЗначений False: ${falseRes},\n`);
}

module.exports = getAllAnswers;

