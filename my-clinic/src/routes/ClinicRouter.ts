import { Router } from "express";
import ClinicController from "../controllers/ClinicController";

const clinicRouter = Router();
const clinicController = new ClinicController();

clinicRouter.get("/clinics", clinicController.getAll);
clinicRouter.get("/clinics/names/:name", clinicController.filterByName);
clinicRouter.get("/clinics/cities/:city", clinicController.filterByCity);
clinicRouter.get("/clinics/states/:state", clinicController.filterByState);
clinicRouter.get("/clinics/postcodes/:code", clinicController.filterByPostcode);
clinicRouter.get("/clinics/suburbs/:suburb", clinicController.filterBySuburb);
clinicRouter.get("/clinics/nearest/:suburb", clinicController.getNearBySuburb);

export { clinicRouter };
