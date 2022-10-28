import AWS from "aws-sdk";
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

class CognitoService {
  private config = {
    region: process.env.AWS_REGION,
  };

  private secretHash = process.env.AWS_COGNITO_SECRET_HASH;

  private clientId = process.env.AWS_COGNITO_CLIENT_ID;

  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  async signUp(username: string, password: string, userAttr: Array<any>) {
    const params = {
      ClientId: this.clientId,
      Password: password,
      Username: username,
      SecretHash: this.generateHash(username),
      UserAttributes: userAttr,
    };

    try {
      await this.cognitoIdentity.signUp(params).promise();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  async signIn(
    username: string,
    password: string
  ): Promise<string | undefined> {
    let result: string | undefined;
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.generateHash(username),
      },
    };
    try {
      const data = await this.cognitoIdentity.initiateAuth(params).promise();
      result = data.AuthenticationResult?.AccessToken;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return result;
  }

  async verifyAccount(username: string, code: string) {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      SecretHash: this.generateHash(username),
      Username: username,
    };

    try {
      await this.cognitoIdentity.confirmSignUp(params).promise();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  private generateHash(username: string): string {
    return crypto
      .createHmac("SHA256", this.secretHash)
      .update(username + this.clientId)
      .digest("base64");
  }
}

export default CognitoService;
