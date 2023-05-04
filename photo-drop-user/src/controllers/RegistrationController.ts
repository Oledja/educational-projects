import { RegistrationService } from "../services/RegistrationService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Request, Response } from "express";

export class RegistrationController {
  private registrationService = new RegistrationService();

  login = async (req: Request, res: Response) => {
    try {
      const { phone, code } = req.body;
      const response = await this.registrationService.login(phone, code);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  verification = async (req: Request, res: Response) => {
    try {
      const { phone } = req.body;
      const response = await this.registrationService.verification(phone);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
