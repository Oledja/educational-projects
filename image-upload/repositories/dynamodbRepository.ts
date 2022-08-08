import * as AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

export default class DynamodbRepository {
  private dynamodbClient: AWS.DynamoDB.DocumentClient =
    new AWS.DynamoDB.DocumentClient();

  private DYNAMODB_TABLE_NAME = "ImageTable";

  saveImage = async (
    imageId: string,
    username: string,
    imageUrl: string,
    imageName: string
  ) => {
    await this.dynamodbClient
      .put({
        TableName: this.DYNAMODB_TABLE_NAME,
        Item: {
          imageId,
          username,
          imageUrl,
          imageName,
        },
      })
      .promise();
  };

  deleteImage = async (imageId: string) => {
    await this.dynamodbClient
      .delete({
        TableName: this.DYNAMODB_TABLE_NAME,
        Key: {
          imageId,
        },
      })
      .promise();
  };

  getAllImages = (username: string) =>
    this.dynamodbClient
      .query({
        TableName: this.DYNAMODB_TABLE_NAME,
        IndexName: "username-index",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username": username,
        },
      })
      .promise();
}
