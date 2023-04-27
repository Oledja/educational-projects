import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { UserService } from "../services/UserService";
import { ResponseUserDTO } from "../types/dto/user/ResponseUserDTO";
import { RequestWithParams } from "../types/customRequests";
import { ParamsId } from "../types/ParamsId";

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

  getMarkedUser = async (
    req: RequestWithParams<ParamsId>,
    res: Response<ResponseUserDTO[] | string>
  ) => {
    try {
      const { id: photoId } = req.params;
      const response = await this.userService.getMarketUsers(photoId);
      res.status(200).json(response);
    } catch (err) {
      res.status(200).json(getErrorMessage(err));
    }
  };
}
