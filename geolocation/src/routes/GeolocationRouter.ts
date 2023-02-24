import Router from "express";
import GeolocationController from "../controller/GeolocationController";

const geolocationRouter = Router();
const geolocationController = new GeolocationController();

geolocationRouter.get("/my-geolocation", geolocationController.getGeolocation);

export { geolocationRouter };
