import { Request, Response } from "express";
import GeolocationResponse from "../interface/GeolocationResponse";
import GeolocationService from "../service/GeolocationService";
import { getErrorMessage } from "../utils/getErrorMessage";

class GeolocationController {
  private geolocationService = new GeolocationService();

  getGeolocation = async (req: Request, res: Response) => {
    try {
      const ip = req.headers["x-forwarded-for"];
      if (typeof ip === "string") {
        const response: GeolocationResponse =
          this.geolocationService.getGeolocation(ip);
        res.status(200).json(response);
      } else throw new Error("The service cannot find your ip in the database");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default GeolocationController;
