import GeolocationRepository from "../repository/GeolocationRepository";
import GeolocationResponse from "../interface/GeolocationResponse";
import Geolocation from "../interface/Geolocation";
import * as dotenv from "dotenv";
import {
  findGeolocation,
  intToIp,
  ipToInt,
  parseGeolocations,
} from "../util/utils";

dotenv.config();

class GeolocationService {
  private FILE_PATH = process.env.FILE_PATH;
  private geolocationRepository = new GeolocationRepository();

  getGeolocation = (ip: string) => {
    try {
      const clientIp = ipToInt(ip);
      const geolocations = this.geolocationRepository.getCeolocations(
        this.FILE_PATH
      );
      const parsedGeolocations: Geolocation[] = parseGeolocations(geolocations);
      const { start, end, location } = findGeolocation(
        clientIp,
        parsedGeolocations
      );
      const clientStartIp = intToIp(start);
      const CLientEndIp = intToIp(end);
      return {
        start: clientStartIp,
        end: CLientEndIp,
        location,
      };
    } catch (err) {
      throw new Error("The service cannot find your ip in the database");
    }
  };
}

export default GeolocationService;
