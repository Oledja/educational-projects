import { Request, Response } from "express";
import RequestOptions from "../interfices/RequestOptions";
import CryptoService from "../services/CryptoService";
import getErrorMessage from "../utils/getErrorMessage";

class CryptoController {
  private cryptoService = new CryptoService();

  getCryptoRate = async (
    req: Request<{}, {}, {}, RequestOptions>,
    res: Response
  ): Promise<void> => {
    try {
      const reqOptions = req.query;
      const response = await this.cryptoService.getCryptoRate(reqOptions);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}

export default CryptoController;
