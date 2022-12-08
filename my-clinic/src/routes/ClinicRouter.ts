import express from "express";
import ClinicController from "../controllers/ClinicController";

const clinicRouter = express.Router();
const clinicController = new ClinicController();

clinicRouter.get("/clinics", clinicController.getAll);
clinicRouter.get("/clinics/names/:name", clinicController.getByName);
clinicRouter.get("/clinics/cities/:city", clinicController.getByCity);
clinicRouter.get("/clinics/states/:state", clinicController.getByState);
clinicRouter.get(
  "/clinics/postcodes/:postcode",
  clinicController.getByPostcode
);
clinicRouter.get("/clinics/suburbs/:suburb", clinicController.getBySuburb);
clinicRouter.get("/clinics/near/:suburb", clinicController.getNearBySuburb);

export { clinicRouter };
