import { FolderService } from "../services/FolderService";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/customRequests";
import { ParamsId } from "../types/ParamsId";
import { CreateFolderDTO } from "../types/dto/folder/CreateFolderDTO";
import { ResponseFolderDTO } from "../types/dto/folder/ResponseFolderDTO";
import { UpdateFolderDTO } from "../types/dto/folder/UpdateFolderDTO";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Response } from "express";
import { ResponseFolderWithPhotosDTO } from "../types/dto/folder/ResponseFolderWithPhotosDTO";
import { PhotoService } from "../services/PhotoService";

export class FolderController {
  private folderService = new FolderService();
  private photoService = new PhotoService();

  getFolder = async (
    req: RequestWithParams<ParamsId>,
    res: Response<ResponseFolderWithPhotosDTO | string>
  ) => {
    try {
      const { id } = req.params;
      const response = await this.folderService.getFolder(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getPhotographerFolders = async (
    req: RequestWithParams<ParamsId>,
    res: Response<ResponseFolderDTO[] | string>
  ) => {
    try {
      const { id } = req.params;
      const response = await this.folderService.getFoldersByPhotographerId(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  createFolder = async (
    req: RequestWithBody<CreateFolderDTO>,
    res: Response<ResponseFolderDTO | string>
  ) => {
    try {
      const create: CreateFolderDTO = req.body;
      const response = await this.folderService.createFolder(create);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updateFolder = async (
    req: RequestWithParamsAndBody<ParamsId, UpdateFolderDTO>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const update: UpdateFolderDTO = req.body;
      await this.folderService.updateFolder(id, update);
      res.status(200).json(`Folder with id: <${id}> updated successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  deleteFolder = async (req: RequestWithParams<ParamsId>, res: Response) => {
    try {
      const { id } = req.params;
      await this.folderService.deleteFolder(id);
      res.status(200).json(`Folder with id: <${id}> deleted successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  addPhotos = async (req: RequestWithParams<ParamsId>, res: Response) => {
    try {
      const { id: folderId } = req.params;
      const photos = req.files as Express.Multer.File[];
      await this.photoService.addPhotos(folderId, photos);
      res.status(200).json("Photos added successfully");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  deletePhoto = async (req: RequestWithParams<ParamsId>, res: Response) => {
    try {
      const { id } = req.params;
      await this.photoService.deletePhoto(id);
      res.status(200).json("Photo deleted successfully");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
