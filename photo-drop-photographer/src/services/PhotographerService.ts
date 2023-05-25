import { Photographer } from "../db/schema/schema";
import { PhotographerRepository } from "../repositories/PhotographerRepository";
import { ResponsePhotographerDTO } from "../types/dto/photographer/ResponsePhotographerDTO";
import { getErrorMessage } from "../utils/getErrorMessage";

export class PhotographerService {
  private photographerRepository = new PhotographerRepository();

  getPhotographer = async (
    photographerId: Photographer["id"]
  ): Promise<ResponsePhotographerDTO> => {
    try {
      const rawPhotographer = await this.photographerRepository.getPhotographer(
        photographerId
      );
      return this.transformToDTO(rawPhotographer);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPhotographers = async (): Promise<ResponsePhotographerDTO[]> => {
    try {
      const rawPhotographers =
        await this.photographerRepository.getPhotographers();
      return rawPhotographers.map(this.transformToDTO);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  transformToDTO = (photographer: Photographer): ResponsePhotographerDTO => {
    const { id, login, email, fullname } = photographer;
    return {
      id,
      login,
      email,
      fullname,
    };
  };
}
