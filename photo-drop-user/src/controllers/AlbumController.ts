import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { CustomRequest } from "../interfaces/CustomRequest";
import { AlbumService } from "../services/AlbumService";

export class AlbumController {
  private albumService = new AlbumService();

  getUserAlbum = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { albumId } = req.params;
      const response = await this.albumService.getUserAlbum(id, albumId);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getUserAlbums = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const response = await this.albumService.getUserAlbums(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
