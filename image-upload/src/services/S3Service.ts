import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";
import AWS, { S3 } from "aws-sdk";
import axios from "axios";
import FormData from "form-data";
import * as dotenv from "dotenv";
import getErrorMessage from "../utils/getErrorMessage";

dotenv.config();

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;
class S3Service {
  private s3: S3;

  private s3Client: S3Client;

  constructor() {
    this.s3 = new AWS.S3({ region, signatureVersion: "v4" });
    this.s3Client = new S3Client({ region });
  }

  signFile = async (fileId: string): Promise<PresignedPost> => {
    try {
      const s3Params = {
        Bucket: bucketName,
        Key: fileId,
        Expires: 3600,
      };
      return await createPresignedPost(this.s3Client, s3Params);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  saveFile = async (data: Express.Multer.File, fileId: string) => {
    try {
      const presigned = await this.signFile(fileId);
      const { url } = presigned;
      const {
        fields: { key },
      } = presigned;
      const form = new FormData();
      form.append("key", key);
      form.append("file", data.buffer);
      await axios.post(url, form, {
        headers: {
          "Content-Length": `${form.getBuffer().length}`,
        },
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteFile = async (fileId: string) => {
    try {
      const s3Params = {
        Bucket: bucketName,
        Key: fileId,
      };
      await this.s3.deleteObject(s3Params).promise();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default S3Service;
