import { CustomRequest } from "../interfaces/CustomRequest";
import { StoreService } from "../services/StoreService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";

export class StoreController {
  private storeService = new StoreService();

  buyPhoto = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { photoId } = req.params;
      const response = await this.storeService.buyPhoto(id, photoId);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  buyFolder = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { folderId } = req.params;
      const response = await this.storeService.buyFolder(id, folderId);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  unlockPhoto = async (req: Request, res: Response) => {
    try {
      const { photoId, userId } = req.params;
      await this.storeService.unlockPhoto(userId, photoId);
      res.status(200).json(`Photo with id: <${photoId}> unlocked successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  unlockFolder = async (req: Request, res: Response) => {
    try {
      const { folderId, userId } = req.params;
      await this.storeService.unlockFolder(userId, folderId);
      res
        .status(200)
        .json(`Folder with id: <${folderId}> unlocked successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
