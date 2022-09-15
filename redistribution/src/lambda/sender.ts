/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { APIGatewayEvent, Context } from "aws-lambda";
import * as AWS from "aws-sdk";
import { MyRequestBody, reqParamValidation } from "../middleware/bodyValidator";
import { errorHandler } from "../middleware/errorHandler";
import middy from "@middy/core";
import { freeTierValidator } from "../middleware/freeTierValidator";
import { tokenValidatior } from "../middleware/tokenValidator";

AWS.config.region = "us-east-1";
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

export const baseHandler = async (event: APIGatewayEvent, context: Context) => {
  const accountId: string = context.invokedFunctionArn.split(":")[4];
  const queueUrl = `https://sqs.us-east-1.amazonaws.com/${accountId}/MyQueue`;
  const body: MyRequestBody = JSON.parse(event.body);
  await sqs
    .sendMessage({
      MessageBody: JSON.stringify({
        storeToken: body.storeToken,
        username: body.username,
        password: body.password,
      }),
      QueueUrl: queueUrl,
    })
    .promise();
  return {
    statusCode: 200,
    body: "Success",
  };
};

export const handler = middy(baseHandler)
  .use(reqParamValidation())
  .use(tokenValidatior())
  .use(freeTierValidator())
  .use(errorHandler());
