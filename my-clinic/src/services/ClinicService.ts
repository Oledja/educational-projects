import { Clinic } from "../db/schema/schema";
import { ClinicRepository } from "../repositories/ClinicRepository";
import { getErrorMessage } from "../utill/getErrorMessage";

class ClinicService {
  private clinicRepository = new ClinicRepository();
  public getAll = async (): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.getAll();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public filterByName = async (name: string): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.filterByName(name);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public filterByCity = async (city: string): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.filterByCity(city);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public filterByState = async (state: string): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.filterByState(state);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public filterByPostcode = async (postcode: string): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.filterByPostcode(postcode);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public filterBySuburb = async (suburb: string): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.filterBySuburb(suburb);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  public getNearBySuburb = async (suburb: string): Promise<Clinic[]> => {
    try {
      return await this.clinicRepository.getNearBySuburb(suburb);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default ClinicService;
