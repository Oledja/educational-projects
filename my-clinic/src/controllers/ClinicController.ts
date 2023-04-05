import { Request, Response } from "express";
import ClinicService from "../services/ClinicService";
import { getErrorMessage } from "../utill/getErrorMessage";

export class ClinicController {
  private clinicService = new ClinicService();
  getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.clinicService.getAll();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
  filterByName = async (req: Request, res: Response) => {
    try {
      const {
        params: { name },
      } = req;
      const response = await this.clinicService.filterByName(name);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  filterByCity = async (req: Request, res: Response) => {
    try {
      const {
        params: { city },
      } = req;
      const response = await this.clinicService.filterByCity(city);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  filterByState = async (req: Request, res: Response) => {
    try {
      const {
        params: { state },
      } = req;
      const response = await this.clinicService.filterByState(state);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  filterByPostcode = async (req: Request, res: Response) => {
    try {
      const {
        params: { code },
      } = req;
      const response = await this.clinicService.filterByPostcode(code);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  filterBySuburb = async (req: Request, res: Response) => {
    try {
      const {
        params: { suburb },
      } = req;
      const response = await this.clinicService.filterBySuburb(suburb);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getNearBySuburb = async (req: Request, res: Response) => {
    try {
      const {
        params: { suburb },
      } = req;
      const response = await this.clinicService.getNearBySuburb(suburb);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
