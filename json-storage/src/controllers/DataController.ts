import { Request, Response } from "express";
import DataService from "../services/DataService";
import getErrorMessage from "../utils/getErrorMessage";

class DataController {
  private dataService = new DataService();

  saveData = async (req: Request, res: Response) => {
    try {
      const { body: data, url: route } = req;
      await this.dataService.saveData(route, data);
      res.status(200).json("Data saved successfully");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getData = async (req: Request, res: Response) => {
    try {
      const { url: route } = req;
      const response = await this.dataService.getData(route);
      if (response) {
        response;
        res.status(200).json(JSON.parse(response.data));
      } else throw new Error(`Тo saved data for the route: ${route}`);
    } catch (err) {
      if (err instanceof Error) res.status(400).json(err.message);
    }
  };
}

export default DataController;
