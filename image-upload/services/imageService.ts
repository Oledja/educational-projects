import DynamodbRepository from "../repositories/dynamoDBRepository";
import S3Repository from "../repositories/s3Repository";
import { PresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 } from "uuid";
import { PromiseResult } from "aws-sdk/lib/request";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { AWSError } from "aws-sdk";

const generateImageUrl = (imageId: string): string =>
  `https://bucket-1mages.s3.amazonaws.com/${imageId}.jpg`;

export default class ImageService {
  private dynamodbRepo: DynamodbRepository = new DynamodbRepository();

  private s3Repo: S3Repository = new S3Repository();

  saveImage = async (
    username: string,
    imageName: string
  ): Promise<PresignedPost> => {
    const imageId: string = v4();
    const presignedPost: PresignedPost = await this.s3Repo.getUploadURL(
      imageId
    );
    const imageUrl: string = generateImageUrl(imageId);
    await this.dynamodbRepo.saveImage(imageId, username, imageUrl, imageName);

    return presignedPost;
  };

  deleteImage = async (imageId: string) => {
    await this.s3Repo.deleteImage(imageId);
    await this.dynamodbRepo.deleteImage(imageId);
  };

  getAllImages = async (username: string) => {
    const output: PromiseResult<DocumentClient.QueryOutput, AWSError> =
      await this.dynamodbRepo.getAllImages(username);
    return output.$response.data;
  };
}
