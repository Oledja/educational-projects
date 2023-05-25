import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { UserService } from "../services/UserService";
import { ResponseUserDTO } from "../types/dto/user/ResponseUserDTO";

export class UserController {
  private userService = new UserService();

  getUsers = async (
    req: Request,
    res: Response<ResponseUserDTO[] | string>
  ) => {
    try {
      const response = await this.userService.getUsers();
      res.status(200).json(response);
    } catch (err) {
      res.status(200).json(getErrorMessage(err));
    }
  };
}
