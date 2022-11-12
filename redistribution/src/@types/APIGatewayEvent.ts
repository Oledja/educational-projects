import { Headers } from "aws-sdk/clients/cloudfront";
import { APIGatewayEventRequestContextV2 } from "aws-lambda";

interface MyRequestBody {
  password: string;
  storeToken: string;
  username: string;
}

interface APIGatewayEvent<TBody> {
  body: TBody;
  headers: Headers;
  httpMethod: string;
  isBase64Encoded: boolean;
  multiValueHeaders: { [name: string]: string[] };
  multiValueQueryStringParameters: { [name: string]: unknown[] };
  path: string;
  pathParameters: { [name: string]: string };
  queryStringParameters: { [name: string]: unknown };
  requestContext: APIGatewayEventRequestContextV2;
  resource: string;
  stageVariables: { [name: string]: string } | null;
}

export { APIGatewayEvent, MyRequestBody };
