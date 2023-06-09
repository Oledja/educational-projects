import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { CustomRequest } from "../interfaces/CustomRequest";
import { validateEmail, validateUpdateUserData } from "../utils/validations";
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

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const { error } = validateEmail(email);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      await this.userService.resetPassword(email);
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
