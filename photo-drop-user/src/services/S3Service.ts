import AWS, { S3 } from "aws-sdk";
import * as dotenv from "dotenv";
import { PutObjectRequest } from "aws-sdk/clients/s3";

dotenv.config();
const region = process.env.REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
  region: region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  savePhoto = async (params: PutObjectRequest) => {
    await this.s3.upload(params).promise();
  };

  getPhotoUrl = async (key: string): Promise<string> => {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    return await this.s3.getSignedUrlPromise("getObject", params);
  };
}
