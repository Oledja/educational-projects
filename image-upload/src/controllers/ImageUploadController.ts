import { Request, Response } from "express";
import CustomRequest from "../interfaces/express/CustomRequest";
import ImageUploadService from "../services/ImageUploadService";
import getErrorMessage from "../utils/getErrorMessage";

class ImageUploadController {
  private imageUploadService = new ImageUploadService();

  uploadImage = async (req: Request, res: Response) => {
    const { file } = req;
    const { username } = req as CustomRequest;
    try {
      if (file) {
        await this.imageUploadService.saveImage(username, file);
        res.status(200).json("Image saved successfully");
      }
      throw new Error("The image is not provided");
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json(err.message);
      }
    }
  };

  getImages = async (req: Request, res: Response) => {
    const { username } = req as CustomRequest;
    try {
      const response = await this.imageUploadService.getImages(username);
      res.status(200).json({
        images: response,
      });
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  deleteImage = async (req: Request, res: Response) => {
    const { fileId } = req.params;
    const { username } = req as CustomRequest;
    try {
      await this.imageUploadService.deleteImage(username, fileId);
      res.status(200).json("Image deleted successfully");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default ImageUploadController;
