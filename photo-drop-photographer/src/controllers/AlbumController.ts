import { RequestWithParams } from "../types/customRequests";
import { ParamsId } from "../types/ParamsId";
import { ResponseAlbumDTO } from "../types/dto/folder/ResponseAlbumDTO";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Request, Response } from "express";
import { ResponseAlbumWithPhotosDTO } from "../types/dto/folder/ResponseAlbumWithPhotosDTO";
import { PhotoService } from "../services/PhotoService";
import { CustomRequest } from "../interfaces/CustomRequest";
import { RequestCreateAlbum } from "../types/dto/folder/RequestCreateAlbum";
import { AlbumService } from "../services/AlbumService";

export class AlbumController {
  private albumService = new AlbumService();
  private photoService = new PhotoService();

  getAlbum = async (
    req: RequestWithParams<ParamsId>,
    res: Response<ResponseAlbumWithPhotosDTO | string>
  ) => {
    try {
      const { id } = req.params;
      const response = await this.albumService.getAlbum(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getPhotographerAlbums = async (
    req: Request,
    res: Response<ResponseAlbumDTO[] | string>
  ) => {
    try {
      const { id } = req as CustomRequest;
      const response = await this.albumService.getAlbumsByPhotographerId(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  createAlbum = async (
    req: Request,
    res: Response<ResponseAlbumDTO | string>
  ) => {
    try {
      const { id } = req as CustomRequest;
      const create: RequestCreateAlbum = req.body;
      const response = await this.albumService.createAlbum(id, create);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  addPhotos = async (req: RequestWithParams<ParamsId>, res: Response) => {
    try {
      const { id } = req.params;
      const photos = req.files as Express.Multer.File[];
      const response = await this.photoService.addPhotos(id, photos);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
