import { Request, Response } from "express";
import CustomRequest from "../interfices/CustomRequest";
import User from "../interfices/User";
import UserService from "../services/UserService";
import { getErrorMessage } from "../utils/util";

class UserController {
  private userService = new UserService();

  signUp = async (req: Request, res: Response) => {
    try {
      const user: User = req.body;
      const response = await this.userService.register(user);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user: User = req.body;
      const response = await this.userService.login(user);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const { token } = req as CustomRequest;
      const response = await this.userService.refresh(token);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getMe = async (req: Request, res: Response) => {
    try {
      const { url } = req;
      const { token } = req as CustomRequest;
      const response = this.userService.getME(url, token);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default UserController;
