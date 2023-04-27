import AWS, { S3 } from "aws-sdk";
import * as dotenv from "dotenv";
import { getErrorMessage } from "../utils/getErrorMessage";
import {
  DeleteObjectRequest,
  DeleteObjectsRequest,
  PutObjectRequest,
} from "aws-sdk/clients/s3";

dotenv.config();

const region = process.env.REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;

export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new AWS.S3({ region, signatureVersion: "v4" });
  }

  savePhoto = async (params: PutObjectRequest) => {
    await this.s3.upload(params).promise();
  };

  deletePhoto = async (key: string) => {
    const params: DeleteObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };
    await this.s3.deleteObject(params).promise();
  };

  deletePhotos = async (keys: string[]) => {
    try {
      const keysToDelete = keys.map((key) => ({ Key: key }));

      const params: DeleteObjectsRequest = {
        Bucket: bucketName,
        Delete: { Objects: keysToDelete },
      };
      await this.s3.deleteObjects(params).promise();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPhotoUrl = async (key: string): Promise<string> => {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    return await this.s3.getSignedUrlPromise("getObject", params);
  };
}
