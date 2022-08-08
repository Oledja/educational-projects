import * as AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";

export default class S3Repository {
  private BUCKET_NAME = "bucket-1mages";

  private IMAGE_TYPE = ".jpg";

  private s3: AWS.S3 = new AWS.S3();

  getUploadURL = (imageId: string): Promise<PresignedPost> => {
    const client: S3Client = new S3Client({ region: "us-east-1" });

    const s3Params = {
      Bucket: this.BUCKET_NAME,
      Key: imageId + this.IMAGE_TYPE,
      Expires: 3000,
    };
    return createPresignedPost(client, s3Params);
  };

  deleteImage = async (imageId: string) => {
    const s3Params = {
      Bucket: this.BUCKET_NAME,
      Key: imageId + this.IMAGE_TYPE,
    };
    await this.s3.deleteObject(s3Params).promise();
  };
}
