import { RegistrationService } from "../services/RegistrationService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Request, Response } from "express";
import { validateLoginData, validatePhoneData } from "../utils/validations";
import { LoginUserDTO } from "../dto/user/LoginUserDTO";

export class RegistrationController {
  private registrationService = new RegistrationService();

  signin = async (req: Request, res: Response) => {
    try {
      const login = req.body as LoginUserDTO;
      const { error } = validateLoginData(login);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      const response = await this.registrationService.signIn(login);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  otp = async (req: Request, res: Response) => {
    try {
      const { phone } = req.body;
      const { error } = validatePhoneData(phone);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      await this.registrationService.otp(phone);
      res.status(200).end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
