import { PhotoService } from "../services/PhotoService";
import { Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { ParamsId } from "../types/ParamsId";
import { RequestWithParamsAndBody } from "../types/customRequests";
import { RequestUserOnPhoto } from "../types/dto/photo/RequestUserOnPhoto";

export class PhotoController {
  private photoService = new PhotoService();

  markUserOnPhoto = async (
    req: RequestWithParamsAndBody<ParamsId, RequestUserOnPhoto>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      await this.photoService.markUserOnPhoto(userId, id);
      res.status(200).json("User successfully marked in the photo");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  unmarkUserOnPhoto = async (
    req: RequestWithParamsAndBody<ParamsId, RequestUserOnPhoto>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      await this.photoService.unmarkUserOnPhoto(userId, id);
      res.status(200).json("User successfully unmarked in the photo");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
