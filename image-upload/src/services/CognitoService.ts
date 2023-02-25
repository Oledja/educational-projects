import AWS from "aws-sdk";
import {
  AttributeListType,
  AuthenticationResultType,
  SignUpRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import * as dotenv from "dotenv";
import getErrorMessage from "../utils/getErrorMessage";
import { generateSecretHash } from "../utils/generateSecretHash";

dotenv.config();

const region = process.env.AWS_REGION;
const clientId = process.env.AWS_COGNITO_CLIENT_ID;

class CognitoService {
  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({ region });
  }

  signUp = async (
    username: string,
    password: string,
    userAttr: AttributeListType
  ) => {
    const secret = generateSecretHash(username);
    const params: SignUpRequest = {
      ClientId: clientId,
      Password: password,
      Username: username,
      SecretHash: secret,
      UserAttributes: userAttr,
    };
    try {
      await this.cognitoIdentity.signUp(params).promise();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  signIn = async (
    username: string,
    password: string
  ): Promise<AuthenticationResultType> => {
    const secret = generateSecretHash(username);
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secret,
      },
    };
    try {
      const { AuthenticationResult: result } = await this.cognitoIdentity
        .initiateAuth(params)
        .promise();
      if (!result) throw new Error("Authentication filed");
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  async verifyAccount(username: string, code: string) {
    const secret = generateSecretHash(username);
    const params = {
      ClientId: clientId,
      ConfirmationCode: code,
      SecretHash: secret,
      Username: username,
    };
    try {
      await this.cognitoIdentity.confirmSignUp(params).promise();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }
}

export default CognitoService;
