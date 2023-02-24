import axios from "axios";
import Response from "./@types/Response";

const getAllResponses = async (endpoints: string[]) => {
  const responses = await Promise.all(
    endpoints.map(async (url) => {
      try {
        const response = await repeatedRequests(url);
        return { url, data: response };
      } catch (err) {
        throw new Error("Internal server error");
      }
    })
  );
  showResult(responses);
};

const repeatedRequests = async (url: string): Promise<object | string> => {
  let attempts = 0;
  let response: object | string = "";
  while (typeof response === "string" && attempts < 3) {
    try {
      const { data } = await axios.get<object>(url);
      response = data;
    } catch (err) {
      if (err instanceof Error) {
        response = `${url}: ${err.message}`;
      }
      attempts++;
    }
  }
  return response;
};

const getPropertyValue = (obj: any, propName: string): string | undefined => {
  for (let prop in obj) {
    if (prop === propName) {
      return obj[prop];
    }
    if (typeof obj[prop] === "object") {
      if (!Array.isArray(obj[prop])) {
        const result = getPropertyValue(obj[prop], propName);
        if (result != undefined) return result;
      }
    }
  }
};

const showResult = (responses: Response[]) => {
  let trueRes = 0;
  let falseRes = 0;
  responses.forEach((res) => {
    const { url, data } = res;
    if (data instanceof Object) {
      const result = getPropertyValue(data, "isDone");
      result ? trueRes++ : falseRes++;
      console.log(`${url}: isDone - ${result}`);
    } else console.log(data);
  });
  console.log(`\nЗначений True: ${trueRes} \nЗначений False: ${falseRes}\n`);
};

export default getAllResponses;
