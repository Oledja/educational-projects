import { PhotographerService } from "../services/PhotographerService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { RequestWithBody, RequestWithParams } from "../types/customRequests";
import { ResponsePhotographerDTO } from "../types/dto/photographer/ResponsePhotographerDTO";
import { ParamsId } from "../types/ParamsId";
import { CreatePhotographerDTO } from "../types/dto/photographer/CreatePhotographerDTO";
import { LoginRequest } from "../types/dto/photographer/LoginRequest";
import { LoginResponse } from "../types/dto/photographer/LoginResponse";
import { RegistrationService } from "../services/RegistrationService";

export class PhotographerController {
  private photographerService = new PhotographerService();
  private registrationService = new RegistrationService();

  signUp = async (
    req: RequestWithBody<CreatePhotographerDTO>,
    res: Response<ResponsePhotographerDTO | string>
  ) => {
    try {
      const photographer: CreatePhotographerDTO = req.body;
      const response = await this.registrationService.signUp(photographer);
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
  getPhotographer = async (
    req: RequestWithParams<ParamsId>,
    res: Response<ResponsePhotographerDTO | string>
  ) => {
    try {
      const { id } = req.params;
      const response = await this.photographerService.getPhotographer(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getPhotographers = async (
    req: Request,
    res: Response<ResponsePhotographerDTO[] | string>
  ) => {
    try {
      const response = await this.photographerService.getPhotographers();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
