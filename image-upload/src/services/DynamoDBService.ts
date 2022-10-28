import AWS from "aws-sdk";

class DynamoDBService {
  private config = {
    region: process.env.AWS_REGION,
  };

  private dynamoDB: AWS.DynamoDB.DocumentClient;

  private tableName = process.env.AWS_DYNAMO_DB_TABLE_NAME;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient(this.config);
  }

  getFile = async (fileId: string) =>
    this.dynamoDB
      .get({
        TableName: this.tableName,
        Key: {
          fileId,
        },
      })
      .promise();

  saveFile = async (fileId: string, username: string, url: string) => {
    try {
      await this.dynamoDB
        .put({
          TableName: this.tableName,
          Item: {
            fileId,
            username,
            url,
          },
        })
        .promise();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  deleteFile = async (fileId: string) => {
    try {
      await this.dynamoDB
        .delete({
          TableName: this.tableName,
          Key: {
            fileId,
          },
        })
        .promise();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  getAllFiles = async (username: string) =>
    this.dynamoDB
      .query({
        TableName: this.tableName,
        IndexName: "username-index",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username": username,
        },
      })
      .promise();
}

export default DynamoDBService;
