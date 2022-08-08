/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import DynamodbRepository from "./repositories/dynamoDBRepository";
import ImageService from "./services/imageService";
import { PresignedPost } from "@aws-sdk/s3-presigned-post";

const imageService = new ImageService();
const dynamoDBRepository: DynamodbRepository = new DynamodbRepository();

export async function uploadImage(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const { username } = event.requestContext.authorizer.claims;
  const imageName: string = event.pathParameters?.imageName || "image";
  const uploadUrl: PresignedPost = await imageService.saveImage(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    username,
    imageName
  );
  return {
    statusCode: 200,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    body: JSON.stringify(uploadUrl),
  };
}

export async function deleteImage(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const imageId: string = event.pathParameters?.imageId;
  await imageService.deleteImage(imageId);

  return {
    statusCode: 200,
    body: `Image with id ${imageId} deleted successfully`,
  };
}

export async function getImages(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const { username } = event.requestContext.authorizer.claims;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const images: object = await dynamoDBRepository.getAllImages(username);
  return {
    statusCode: 200,
    body: JSON.stringify(images),
  };
}

export async function registration(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 302,
    headers: {
      location:
        // eslint-disable-next-line max-len
        "https://image-upload-user-pool-domain.auth.us-east-1.amazoncognito.com/login?client_id=66ot47aat24oqaaci92hsoobo0&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://image-upload-app.com/welcome",
    },
    body: "Welcome to Image Upload Service !",
  };
}
