import GeolocationRepository from "../repository/GeolocationRepository";
import * as dotenv from "dotenv";
import {
  findGeolocation,
  intToIp,
  ipToInt,
  parseGeolocations,
} from "../utils/utils";

dotenv.config();

class GeolocationService {
  private filePath = process.env.FILE_PATH;
  private geolocationRepository = new GeolocationRepository();

  getGeolocation = (ip: string) => {
    try {
      const clientIp = ipToInt(ip);
      const geolocations = this.geolocationRepository.getCeolocations(
        this.filePath
      );
      const parsedGeolocations = parseGeolocations(geolocations);
      const { start, end, location } = findGeolocation(
        clientIp,
        parsedGeolocations
      );
      const clientStartIp = intToIp(start);
      const clientEndIp = intToIp(end);
      return {
        start: clientStartIp,
        end: clientEndIp,
        location,
      };
    } catch (err) {
      throw new Error("The service cannot find your ip in the database");
    }
  };
}

export default GeolocationService;
