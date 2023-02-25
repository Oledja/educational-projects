import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import getErrorMessage from "../utils/getErrorMessage";

dotenv.config();

const tableName = process.env.AWS_DYNAMO_DB_TABLE_NAME;
const region = process.env.AWS_REGION;
class DynamoDBService {
  private dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient({ region });
  }

  getFile = async (fileId: string) => {
    try {
      const { Item: result } = await this.dynamoDB
        .get({
          TableName: tableName,
          Key: {
            fileId,
          },
        })
        .promise();
      if (!result) throw new Error(`File with id: <${fileId} not found>`);
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  saveFile = async (fileId: string, username: string, url: string) => {
    try {
      const result = await this.dynamoDB
        .put({
          TableName: tableName,
          Item: {
            fileId,
            username,
            url,
          },
        })
        .promise();
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteFile = async (fileId: string) => {
    try {
      await this.dynamoDB
        .delete({
          TableName: tableName,
          Key: {
            fileId,
          },
        })
        .promise();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getAllFiles = async (username: string) => {
    try {
      const { Items: result } = await this.dynamoDB
        .query({
          TableName: tableName,
          IndexName: "username-index",
          KeyConditionExpression: "username = :username",
          ExpressionAttributeValues: {
            ":username": username,
          },
        })
        .promise();
      if (!result)
        throw new Error(`No saved files for user with username: <${username}>`);
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default DynamoDBService;
