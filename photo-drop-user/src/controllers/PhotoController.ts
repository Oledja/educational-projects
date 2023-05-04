import { PhotoService } from "../services/PhotoService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { CustomRequest } from "../interfaces/CustomRequest";

export class PhotoController {
  private photoService = new PhotoService();

  getUserPhotos = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const response = await this.photoService.getUserPhotos(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
