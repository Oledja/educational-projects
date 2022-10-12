const axios = require("axios").default;

const getAllResponses = async (endpoints) => {
  const responses = await Promise.all(
    endpoints.map(async (url) => {
      return ({ data: result } = await repeatedRequests(url));
    })
  );
  showResult(responses);
};

const repeatedRequests = async (url) => {
  let attempts = 0;
  const answer = await axios.get(url);
  while (answer.status != 200 && attempts < 2) {
    answer = await axios.get(url);
  }
  if (answer.status == 200) return answer;

  console.log(`Error: ${answer.url}: returned status code - ${answer.code}`);
};

const getPropertyValue = (obj, propName) => {
  for (let prop in obj) {
    if (prop === propName) {
      return obj[prop];
    }
    if (typeof obj[prop] === "object") {
      let result = getPropertyValue(obj[prop], propName);
      if (result != undefined) return result;
    }
  }
};

const showResult = (responses) => {
  let trueRes = 0;
  let falseRes = 0;
  const result = responses.map((resp) => {
    return {
      url: resp.config.url,
      isDone: getPropertyValue(resp.data, "isDone"),
    };
  });

  result.forEach((res) => {
    console.log(`${res.url}: isDone - ${res.isDone}`);
    if (res.isDone === true) {
      trueRes++;
    } else falseRes++;
  });
  console.log(`\nЗначений True: ${trueRes}, \nЗначений False: ${falseRes},\n`);
};

module.exports = getAllResponses;
