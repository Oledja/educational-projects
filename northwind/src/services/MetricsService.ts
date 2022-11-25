import Metrics from "../@types/Metric";
import IP2Airport from "ip2airport";
import geoip from "geoip-lite";
import { errorHandler } from "../errors/errorHandler";

const queryCounter: Metrics = {
  leftJoinQueryCount: 0,
  queryCount: 0,
  queryLogs: [],
  resultsCount: 0,
  selectQueryCount: 0,
  whereQueryCount: 0,
};

class MetricService {
  static addSelectQuery = (count: number, query: string) => {
    queryCounter.selectQueryCount += 1;
    queryCounter.queryCount += 1;
    queryCounter.resultsCount += count;
    queryCounter.queryLogs.push(query);
  };

  static addWhereQuery = (count: number, query: string) => {
    queryCounter.whereQueryCount += 1;
    queryCounter.queryCount += 1;
    queryCounter.resultsCount += count;
    queryCounter.queryLogs.push(query);
  };

  static addLeftJoinQuery = (count: number, query: string) => {
    queryCounter.leftJoinQueryCount += 1;
    queryCounter.queryCount += 1;
    queryCounter.resultsCount += count;
    queryCounter.queryLogs.push(query);
  };

  static dropMetrics = () => {
    queryCounter.leftJoinQueryCount = 0;
    queryCounter.selectQueryCount = 0;
    queryCounter.whereQueryCount = 0;
    queryCounter.queryCount = 0;
    queryCounter.resultsCount = 0;
    queryCounter.queryLogs = [];
  };

  static getMetrics = () => queryCounter;
}

const getClientCountryByIp = (ip: string) => {
  const result = geoip.lookup(ip);
  if (result) {
    const { country } = result;
    return country;
  }
  return new Error("Country not defined");
};

const getNearestAirportByIp = async (ip: string) => {
  const ip2airport = new IP2Airport();
  try {
    const result = await ip2airport.nearest(ip, 100, 1, "K");
    const { iata } = result[0];
    return iata;
  } catch (err) {
    return errorHandler(err);
  }
};

export default MetricService;
export { getClientCountryByIp, getNearestAirportByIp };
