import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import AWS, { S3 } from "aws-sdk";
import axios from "axios";
import FormData from "form-data";
import * as dotenv from "dotenv";

dotenv.config();

class S3Service {
  private config = {
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
  };

  private s3: S3;

  private s3Client: S3Client;

  private bucketName = process.env.AWS_S3_BUCKET_NAME;

  constructor() {
    this.s3 = new AWS.S3(this.config);
    this.s3Client = new S3Client(this.config);
  }

  signFile = async (fileId: string) => {
    const s3Params = {
      Bucket: this.bucketName,
      Key: fileId,
      Expires: 3600,
    };

    return createPresignedPost(this.s3Client, s3Params);
  };

  saveFile = async (data: Express.Multer.File, fileId: string) => {
    const presigned = await this.signFile(fileId);
    const { url } = presigned;
    const {
      fields: { key },
    } = presigned;
    const form = new FormData();
    form.append("key", key);
    form.append("file", data.buffer);
    try {
      await axios.post(url, form, {
        headers: {
          "Content-Length": `${form.getBuffer().length}`,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  deleteFile = async (fileId: string) => {
    const s3Params = {
      Bucket: this.bucketName,
      Key: fileId,
    };
    await this.s3.deleteObject(s3Params).promise();
  };
}

export default S3Service;
