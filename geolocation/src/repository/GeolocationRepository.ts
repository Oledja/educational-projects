import { readFileSync } from "fs";

class GeolocationRepository {
  getCeolocations = (path: string): string[] => {
    return readFileSync(path, "utf-8").split("\n");
  };
}

export default GeolocationRepository;
