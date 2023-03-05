import IP2Airport from "ip2airport";
import geoip from "geoip-lite";
import { getErrorMessage } from "../utils/getErrorMessage";

const getClientCountryByIp = (ip: string) => {
  try {
    const result = geoip.lookup(ip);
    if (!result) throw new Error("Country not defined");
    const { country } = result;
    return country;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
};

const getNearestAirportByIp = async (ip: string) => {
  try {
    const ip2airport = new IP2Airport();
    const result = await ip2airport.nearest(ip, 100, 1, "K");
    const { iata } = result[0];
    return iata;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
};

export { getClientCountryByIp, getNearestAirportByIp };
