import Clinic from "../@types/Clinic";
import ClinicRepository from "../repositories/ClinicRepository";
import { prepareResponse } from "../utill/utill";

class ClinicService {
  private clinicRepository = new ClinicRepository();

  public getAll = async () => {
    const clinics: Clinic[] = await this.clinicRepository.getAll();
    return prepareResponse(clinics);
  };

  public getByName = async (name: string) => {
    const clinics: Clinic[] = await this.clinicRepository.getByName(name);
    return prepareResponse(clinics);
  };

  public getByCity = async (city: string) => {
    const clinics: Clinic[] = await this.clinicRepository.getByCity(city);
    return prepareResponse(clinics);
  };

  public getByState = async (state: string) => {
    const clinics: Clinic[] = await this.clinicRepository.getByState(state);
    return prepareResponse(clinics);
  };

  public getByPostcode = async (postcode: string) => {
    const clinics: Clinic[] = await this.clinicRepository.getByPostcode(
      postcode
    );
    return prepareResponse(clinics);
  };

  public getBySuburb = async (suburb: string) => {
    const clinics: Clinic[] = await this.clinicRepository.getBySuburb(suburb);
    return prepareResponse(clinics);
  };

  public getNearBySuburb = async (suburb: string) => {
    const clinics: Clinic[] = await this.clinicRepository.getNearBySuburb(
      suburb
    );
    return prepareResponse(clinics);
  };
}

export default ClinicService;
