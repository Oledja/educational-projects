import { randomUUID } from "crypto";
import DynamoDBService from "./DynamoDBService";
import S3Service from "./S3Service";
import * as dotenv from "dotenv";
import { ImagesResponse } from "../@types/api-gateway";

dotenv.config();

class ImageUploadService {
  private s3 = new S3Service();

  private dynamo = new DynamoDBService();

  saveImage = async (
    username: string,
    data: Express.Multer.File,
    type: string
  ) => {
    const fileId = `${randomUUID()}.${type}`;
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileId}`;
    try {
      await this.s3.saveFile(data, fileId);
      await this.dynamo.saveFile(fileId, username, url);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  getImages = async (username: string) => {
    const result = await this.dynamo.getAllFiles(username);
    const response: ImagesResponse[] = [];
    result.Items?.forEach((item) => {
      const url = item.url as string;
      const fileId = item.fileId as string;
      response.push({ fileId, url });
    });
    return response;
  };

  deleteImage = async (username: string, fileId: string) => {
    try {
      const result = await this.dynamo.getFile(fileId);
      if (result.Item && result.Item.username === username) {
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
