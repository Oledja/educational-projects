import { Router } from "express";
import CryptoController from "../controllers/CryptoController";
import cryptoMiddleware from "../middlewares/CryptocurrencyMiddleware";

const cryptoRouter = Router();
const cryptoController = new CryptoController();

cryptoRouter.get("/crypto", cryptoMiddleware, cryptoController.getCryptoRate);

export { cryptoRouter };
