import { AttributeType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { Request, Response } from "express";
import SignInRequest from "../interfaces/cognito/SignInRequest";
import CognitoSignUpRequest from "../interfaces/cognito/SignUpRequest";
import VerifyRequest from "../interfaces/cognito/VerifyRequest";
import CognitoService from "../services/CognitoService";
import getErrorMessage from "../utils/getErrorMessage";

class AuthController {
  private cognitoService = new CognitoService();

  signUp = async (req: Request, res: Response) => {
    const { username, password, email } = req.body as CognitoSignUpRequest;
    const userAttr: AttributeType[] = [{ Name: "email", Value: email }];
    try {
      await this.cognitoService.signUp(username, password, userAttr);
      res.status(200).json("Registration completed successfully");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json(err.message);
      }
    }
  };

  signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body as SignInRequest;
    try {
      const response = await this.cognitoService.signIn(username, password);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  verify = async (req: Request, res: Response) => {
    const { username, code } = req.body as VerifyRequest;
    try {
      await this.cognitoService.verifyAccount(username, code);
      res.status(200).json("Verification completed successfully");
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default AuthController;
