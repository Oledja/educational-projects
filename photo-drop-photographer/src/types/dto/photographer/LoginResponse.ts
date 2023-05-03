import { ResponsePhotographerDTO } from "./ResponsePhotographerDTO";

export type LoginResponse = {
  photographer: ResponsePhotographerDTO;
  accessToken: string;
};
