import { ResponseFolderDTO } from "../folder/ResponseFolderDTO";
import { ResponsePhotographerDTO } from "./ResponsePhotographerDTO";

export type LoginResponse = {
  photographer: ResponsePhotographerDTO;
  folders: ResponseFolderDTO[];
  accessToken: string;
};
