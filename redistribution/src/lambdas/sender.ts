import middy from "@middy/core";
import * as AWS from "aws-sdk";
import { APIGatewayEvent, MyRequestBody } from "../@types/APIGatewayEvent";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { requestValidator } from "../middleware/requestValidator";
import { errorHandler } from "../middleware/errorHandler";
import { getErrorMessage } from "../utils/getErrorMessage";
import * as dotenv from "dotenv";

dotenv.config();

AWS.config.region = process.env.REGION;
const url = process.env.SQS_INVOCATION_URL;
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const baseSender = async (event: APIGatewayEvent<MyRequestBody>) => {
  try {
    await sqs
      .sendMessage({
        MessageBody: JSON.stringify(event.body),
        QueueUrl: url,
      })
      .promise();
    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (err) {
    const message = getErrorMessage(err);
    return { statusCode: 500, err: message };
  }
};

export const sender = middy(baseSender)
  .use(httpJsonBodyParser())
  .use(requestValidator())
  .use(errorHandler());
