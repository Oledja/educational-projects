import Geolocation from "../interface/Geolocation";

const findGeolocation = (
  ip: number,
  geolocations: Geolocation[]
): Geolocation => {
  const index = Math.round(geolocations.length / 2);
  const { start, end } = geolocations[index];
  const { length } = geolocations;

  if (ip < start) {
    return findGeolocation(ip, geolocations.slice(0, index));
  } else if (ip > end) {
    return findGeolocation(ip, geolocations.slice(index, length));
  } else {
    return geolocations[index];
  }
};

const parseGeolocations = (geolocations: string[]): Geolocation[] => {
  const parsedLocation: Geolocation[] = [];
  geolocations.forEach((ip: string) => {
    const rawResponse = ip.split('"').join("").split(",");
    const start = parseInt(rawResponse[0]);
    const end = parseInt(rawResponse[1]);
    const location = rawResponse[2];
    parsedLocation.push({ start, end, location });
  });
  return parsedLocation;
};

const ipToInt = (ip: string): number => {
  const items = ip.split(".");
  let power = 3;
  let result = 0;

  items.forEach((el) => {
    result += parseInt(el) * Math.pow(256, power);
    power--;
  });
  return result;
};

const intToIp = (int: number): string => {
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

export { findGeolocation, parseGeolocations, ipToInt, intToIp };
