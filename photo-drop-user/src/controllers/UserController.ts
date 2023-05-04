import { UpdateUserDTO } from "../dto/user/UpdateUserDTO";
import { CustomRequest } from "../interfaces/CustomRequest";
import { UserService } from "../services/UserService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Request, Response } from "express";

export class UserController {
  private userService = new UserService();

  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const response = await this.userService.getUser(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(200).json(getErrorMessage(err));
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const update = req.body as UpdateUserDTO;
      await this.userService.updateUser(id, update);
      res.status(200).json(`User with id: <${id}> updated successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updateUserSelfie = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const selfie = req.files as Express.Multer.File[];
      await this.userService.updateUserSelfie(id, selfie[0]);
      res
        .status(200)
        .json(`Selfie for user with id: <${id}> updated successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  deleteUserSelfie = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      await this.userService.deleteUserSelfie(id);
      res
        .status(200)
        .json(`Selfie from user with id: <${id}> deleted successfully`);
    } catch (err) {
      res.status(200).json(getErrorMessage(err));
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      await this.userService.deleteUser(id);
      res.status(200).json(`User with id: <${id}> deleted successfully`);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
