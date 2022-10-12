const fs = require("fs");

const LOCATIONS = "./IP2LOCATION-LITE-DB1.CSV";
const readIpAddresses = path => {
  try {
    if (fs.existsSync(path)) {
      return fs.readFileSync(path, "utf-8").split("\n");
    }
  } catch (err) {
    console.error(err);
  }
};

const findLolocation = reqIp => {
  const ip = ipToInt(reqIp);
  const addressesFromFile = readIpAddresses(LOCATIONS);
  const parsedAdresses = parseAddresses(addressesFromFile);
  const result = findLocationInDB(ip, parsedAdresses);
  return prepareResponse(result);
};

const findLocationInDB = (ip, ipAddresses) => {
  const index = Math.round(ipAddresses.length / 2);
  const current = ipAddresses[index];

  if (ip < current.start) {
    return findLocationInDB(ip, ipAddresses.slice(0, index));
  } else if (ip > current.end) {
    return findLocationInDB(ip, ipAddresses.slice(index, ipAddresses.length));
  } else {
    return ipAddresses[index];
  }
};

const prepareResponse = location => {
  const start = intToIp(location.start);
  const end = intToIp(location.end);
  return `ip: ${start} - ${end} ${location.country}`;
};

const parseAddresses = ipAddresses => {
  return ipAddresses.map(ip => {
    data = ip.replaceAll('"', "").replaceAll("\r", "").split(",");
    return {
      start: parseInt(data[0]),
      end: parseInt(data[1]),
      country: data[3],
    };
  });
};

const ipToInt = ip => {
  const items = ip.split(".");
  let power = 3;
  let result = 0;

  items.forEach(el => {
    result += parseInt(el) * Math.pow(256, power);
    power--;
  });
  return result;
};

const intToIp = int => {
  return (
    ((int >> 24) & 0xff) +
    "." +
    ((int >> 16) & 0xff) +
    "." +
    ((int >> 8) & 0xff) +
    "." +
    (int & 0xff)
  );
};

module.exports = findLolocation;
