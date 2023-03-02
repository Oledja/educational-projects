import { Request, Response } from "express";
import Service from "../services/Service";
import getErrorMessage from "../utils/getErrorMessage";

class Controller {
  private service = new Service();

  save = async (req: Request, res: Response) => {
    try {
      const { body: data, url: route } = req;
      await this.service.save(route, data);
      res.status(200).json("Data saved successfully");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const { url: route } = req;
      const response = await this.service.get(route);
      if (response) {
        response;
        res.status(200).json(JSON.parse(response.data));
      } else throw new Error(`Тo saved data for the route: ${route}`);
    } catch (err) {
      if (err instanceof Error) res.status(400).json(err.message);
    }
  };
}

export default Controller;
