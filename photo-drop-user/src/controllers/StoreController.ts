import { CustomRequest } from "../interfaces/CustomRequest";
import { StoreService } from "../services/StoreService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";

export class StoreController {
  private storeService = new StoreService();

  buyAlbum = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { albumId } = req.params;
      const response = await this.storeService.buyAlbum(id, albumId);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  unlockAlbum = async (req: Request, res: Response) => {
    try {
      const { albumId, userId } = req.params;
      await this.storeService.unlockAlbum(userId, albumId);
      res.writeHead(301, { Location: "http://google.com" });
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
