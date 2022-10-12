import { Request, Response } from "express";
import DataModel from "../models/DataModel";
import IDataModel from "../interfaces/IDataModel";

class DataController {
  public async saveData(req: Request, res: Response) {
    try {
      const { body: data, url: route } = req;
      const routeExist: IDataModel | null = await DataModel.findOne({
        route,
      });
      if (routeExist) {
        throw new Error(`Sorry, route: ${routeExist.route} already exists`);
      }
      await new DataModel({ route, data }).save();
      res.status(200).json("Data saved successfully");
    } catch (err) {
      if (err instanceof Error) res.status(400).json(err.message);
    }
  }

  public async getData(req: Request, res: Response) {
    try {
      const { url: route } = req;
      const result: IDataModel | null = await DataModel.findOne({ route });
      if (!result) {
        throw new Error(`No data for route: ${route}`);
      }
      res.status(200).json(JSON.parse(result.data));
    } catch (err) {
      if (err instanceof Error) res.status(400).json(err.message);
    }
  }
}

export default new DataController();
