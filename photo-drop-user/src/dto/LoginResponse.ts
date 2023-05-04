import { ResponseUserDTO } from "./user/ResponseUserDTO";

export type LoginResponse = {
  user: ResponseUserDTO;
  accessToken: string;
};
