import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { AuthService } from "../services/AuthService";
import { RequestLoginDTO } from "../dto/RequestLoginDTO";
import { validateLoginData } from "../utils/validations";

export class AuthController {
  private authService = new AuthService();

  login = async (req: Request, res: Response) => {
    try {
      const login = req.body as RequestLoginDTO;
      const { error } = validateLoginData(login);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      const response = await this.authService.login(login);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  signUp = async (req: Request, res: Response) => {
    try {
      const candidate = req.body as RequestLoginDTO;
      const { error } = validateLoginData(candidate);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      const response = await this.authService.signUp(candidate);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  signUpGoogle = async (req: Request, res: Response) => {
    try {
      const code = req.query.code as string;
      console.log(code);

      const response = await this.authService.signUpGoogle(code);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getGoogleAuthUrl = async (req: Request, res: Response) => {
    try {
      const response = this.authService.getGoogleAuthUri();
      res.status(200).json({ authUrl: response });
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
