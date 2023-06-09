import { ResponseSubscriptionDTO } from "./ResponseSubscriptionDTO";
import { ResponseUserDTO } from "./ResponseUserDTO";

export type ResponseLoginDTO = {
  user: ResponseUserDTO;
  accessToken: string;
  subscription: ResponseSubscriptionDTO;
};
