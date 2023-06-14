import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { CustomRequest } from "../interfaces/CustomRequest";
import {
  validateRestorePassword,
  validateUpdateUserData,
} from "../utils/validations";
import { RequestRestorePassword } from "../dto/RequestRestorePassword";
export class UserController {
  private userService = new UserService();

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const update = req.body as UpdateUserDTO;
      const { error } = validateUpdateUserData(update);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      await this.userService.updateUser(id, update);
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  restorePassword = async (req: Request, res: Response) => {
    try {
      const restore = req.body as RequestRestorePassword;
      const { error } = validateRestorePassword(restore);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      await this.userService.restorePassword(restore);
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
