import middy from "@middy/core";
import * as AWS from "aws-sdk";
import { APIGatewayEvent, MyRequestBody } from "../@types/APIGatewayEvent";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { requestValidator } from "../middleware/requestValidator";
import { errorHandler } from "../middleware/errorHandler";

AWS.config.region = process.env.REGION;
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const baseSender = async (event: APIGatewayEvent<MyRequestBody>) => {
  await sqs
    .sendMessage({
      MessageBody: JSON.stringify(event.body),
      QueueUrl: process.env.SQS_INVOCATION_URL,
    })
    .promise();

  return {
    statusCode: 200,
    body: "Success",
  };
};

const sender = middy(baseSender)
  .use(httpJsonBodyParser())
  .use(requestValidator())
  .use(errorHandler());
export { sender };
