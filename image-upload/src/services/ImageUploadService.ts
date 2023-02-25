import { randomUUID } from "crypto";
import DynamoDBService from "./DynamoDBService";
import S3Service from "./S3Service";
import * as dotenv from "dotenv";
import { ImagesResponse } from "../@types/api-gateway";
import getErrorMessage from "../utils/getErrorMessage";

dotenv.config();
const bucket = process.env.AWS_S3_BUCKET_NAME;

class ImageUploadService {
  private s3 = new S3Service();

  private dynamo = new DynamoDBService();

  saveImage = async (username: string, file: Express.Multer.File) => {
    const type = file.originalname.split(".")[1];
    const fileId = `${randomUUID()}.${type}`;
    const url = `https://${bucket}.s3.amazonaws.com/${fileId}`;
    try {
      await this.s3.saveFile(file, fileId);
      await this.dynamo.saveFile(fileId, username, url);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  getImages = async (username: string): Promise<ImagesResponse[]> => {
    try {
      const items = await this.dynamo.getAllFiles(username);
      const response: ImagesResponse[] = [];
      items.forEach((item) => {
        const url = item.url as string;
        const fileId = item.fileId as string;
        response.push({ fileId, url });
      });
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteImage = async (username: string, fileId: string) => {
    try {
      const item = await this.dynamo.getFile(fileId);
      if (item.username === username) {
        await this.s3.deleteFile(fileId);
        await this.dynamo.deleteFile(fileId);
      } else {
        throw new Error("You do not have permission to delete this file");
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };
}

export default ImageUploadService;
