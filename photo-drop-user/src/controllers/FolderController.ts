import { FolderService } from "../services/FolderService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { CustomRequest } from "../interfaces/CustomRequest";

export class FolderController {
  private folderService = new FolderService();

  getUserFolder = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { folderId } = req.body;
      const response = await this.folderService.getUserFolder(id, folderId);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getUserFolders = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const response = await this.folderService.getUserFolders(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
