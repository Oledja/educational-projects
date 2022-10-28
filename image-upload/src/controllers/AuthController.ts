import { Request, Response } from "express";
import CognitoService from "../services/CognitoService";

const signUp = async (request: Request, response: Response) => {
  const { username, password, email } = request.body;
  const userAttr = [];
  userAttr.push({ Name: "email", Value: email });

  const cognito = new CognitoService();
  try {
    await cognito.signUp(username, password, userAttr);
    response.status(200).json("Registration completed successfully");
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json(err.message);
    }
  }
};

const signIn = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  const cognito = new CognitoService();
  try {
    const token = await cognito.signIn(username, password);
    if (token) {
      response.status(200).send({
        message: "Authorization completed successfully",
        AccessToken: token,
      });
    } else response.status(400).json("Authorization failed");
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json(err.message);
    }
  }
};

const verify = async (request: Request, response: Response) => {
  const { username, code } = request.body;
  const cognito = new CognitoService();
  try {
    await cognito.verifyAccount(username, code);
    response.status(200).json("Verification completed successfully");
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json(err.message);
    }
  }
};

export { signIn, signUp, verify };
