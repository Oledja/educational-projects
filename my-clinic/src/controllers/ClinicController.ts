import ClinicService from "../services/ClinicService";
import { Request, Response } from "express";

class ClinicController {
  private clinicService = new ClinicService();

  public getAll = async (req: Request, res: Response) => {
    const response = await this.clinicService.getAll();
    return res.status(200).json(response);
  };

  public getByName = async (req: Request, res: Response) => {
    const {
      params: { name },
    } = req;
    const response = await this.clinicService.getByName(name);
    return res.status(200).json(response);
  };

  public getByCity = async (req: Request, res: Response) => {
    const {
      params: { city },
    } = req;
    const response = await this.clinicService.getByCity(city);
    return res.status(200).json(response);
  };

  public getByState = async (req: Request, res: Response) => {
    const {
      params: { state },
    } = req;
    const response = await this.clinicService.getByState(state);
    return res.status(200).json(response);
  };

  public getByPostcode = async (req: Request, res: Response) => {
    const {
      params: { postcode },
    } = req;
    const response = await this.clinicService.getByPostcode(postcode);
    return res.status(200).json(response);
  };

  public getBySuburb = async (req: Request, res: Response) => {
    const {
      params: { suburb },
    } = req;
    const response = await this.clinicService.getBySuburb(suburb);
    return res.status(200).json(response);
  };

  public getNearBySuburb = async (req: Request, res: Response) => {
    const {
      params: { suburb },
    } = req;
    const response = await this.clinicService.getNearBySuburb(suburb);
    return res.status(200).json(response);
  };
}

export default ClinicController;
