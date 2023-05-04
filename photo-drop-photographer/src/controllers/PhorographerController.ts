import { PhotographerService } from "../services/PhotographerService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { RequestWithParams } from "../types/customRequests";
import { ResponsePhotographerDTO } from "../types/dto/photographer/ResponsePhotographerDTO";
import { UpdatePhotographerDTO } from "../types/dto/photographer/UpdatePhotographerDTO";
import { ParamsId } from "../types/ParamsId";
import { CustomRequest } from "../interfaces/CustomRequest";

export class PhotographerController {
  private photographerService = new PhotographerService();
  getPhotographer = async (
    req: RequestWithParams<ParamsId>,
    res: Response<ResponsePhotographerDTO | string>
  ) => {
    try {
      const { id } = req.params;
      const response = await this.photographerService.getPhotographer(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getPhotographers = async (
    req: Request,
    res: Response<ResponsePhotographerDTO[] | string>
  ) => {
    try {
      const response = await this.photographerService.getPhotographers();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updatePhotographer = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const update: UpdatePhotographerDTO = req.body;
      await this.photographerService.updatePhotographer(id, update);
      res
        .status(200)
        .json(`Photographer with id: <${id}> updated successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  deletePhotographer = async (
    req: RequestWithParams<ParamsId>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      await this.photographerService.deletePhotographer(id);
      res
        .status(200)
        .json(`Photographer with id: <${id}> deleted successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
