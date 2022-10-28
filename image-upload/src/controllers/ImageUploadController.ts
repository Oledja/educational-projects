import { Request, Response } from "express";
import ImageUploadService from "../services/ImageUploadService";

const uploadImage = async (request: Request, response: Response) => {
  const { file } = request;
  const type = file?.originalname.split(".")[1];
  const { username } = response.locals;
  const imageUploadService = new ImageUploadService();
  try {
    if (file && type && typeof username === "string") {
      await imageUploadService.saveImage(username, file, type);
      response.status(200).json("Image saved successfully");
    }
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json(err.message);
    }
  }
};

const getImages = async (request: Request, response: Response) => {
  const username = response.locals.username as string;
  const imageUploadService = new ImageUploadService();
  const result = await imageUploadService.getImages(username);
  response.status(200).json({
    images: result,
  });
};

const deleteImage = async (request: Request, response: Response) => {
  const { fileId } = request.params;
  const username = response.locals.username as string;
  const imageUploadService = new ImageUploadService();
  try {
    await imageUploadService.deleteImage(username, fileId);
    response.status(200).json("Image deleted successfully");
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json(err.message);
    }
  }
};

export { uploadImage, getImages, deleteImage };
