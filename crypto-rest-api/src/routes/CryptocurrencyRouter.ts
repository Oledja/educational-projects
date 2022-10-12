import { Router } from "express";
import cryptocurrencyMiddleware from "../middlewares/CryptocurrencyMiddleware";
import * as CryptocurrencyController from "../controllers/CryptocurrencyController";

const router: Router = Router();

router.get(
  "/",
  cryptocurrencyMiddleware,
  CryptocurrencyController.getCoinAverageRate
);

export = router;
