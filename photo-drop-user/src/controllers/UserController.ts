import { UpdateUserPhoneDTO } from "../dto/user/UpdateUserPhoneDTO";
import { CustomRequest } from "../interfaces/CustomRequest";
import { UserService } from "../services/UserService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Request, Response } from "express";
import { validateLoginData, validatePhoneData } from "../utils/validations";

export class UserController {
  private userService = new UserService();

  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const response = await this.userService.getUser(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updateUserPhoneOTP = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { phone } = req.body;
      const { error } = validatePhoneData(phone);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      await this.userService.updatePhoneOTP(id, phone);
      res.status(200).end();
    } catch (err) {
      res.status(200).json(getErrorMessage(err));
    }
  };

  updateUserPhone = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const update = req.body as UpdateUserPhoneDTO;
      const { error } = validateLoginData(update);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      await this.userService.updateUserPhone(id, update);
      res.status(200).end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updateUserName = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const { name } = req.body;
      await this.userService.updateUserName(id, name);
      res.status(200).end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updateUserSelfie = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const selfie = req.files as Express.Multer.File[];
      await this.userService.updateUserSelfie(id, selfie[0]);
      res.status(200).end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
