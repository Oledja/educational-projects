import { CreatePhotographerDTO } from "../types/dto/photographer/CreatePhotographerDTO";
import { ResponsePhotographerDTO } from "../types/dto/photographer/ResponsePhotographerDTO";
import { RegistrationService } from "../services/RegistrationService";
import { RequestWithBody } from "../types/customRequests";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Response } from "express";
import { LoginRequest } from "../types/dto/photographer/LoginRequest";
import { LoginResponse } from "../types/dto/photographer/LoginResponse";

export class RegistrationController {
  private registrationService = new RegistrationService();

  registration = async (
    req: RequestWithBody<CreatePhotographerDTO>,
    res: Response<ResponsePhotographerDTO | string>
  ) => {
    try {
      const photographer: CreatePhotographerDTO = req.body;
      const response = await this.registrationService.registration(
        photographer
      );

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  login = async (
    req: RequestWithBody<LoginRequest>,
    res: Response<LoginResponse | string>
  ) => {
    try {
      const login: LoginRequest = req.body;
      const response = await this.registrationService.login(login);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
