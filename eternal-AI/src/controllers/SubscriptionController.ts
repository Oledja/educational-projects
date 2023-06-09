import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { RequestPaymentCardDTO } from "../dto/RequestPaymentCardDTO";
import { CustomRequest } from "../interfaces/CustomRequest";
import { SubscriptionService } from "../services/SubscriptionService";
import { validatePaymentCardData } from "../utils/validations";

export class SubscriptionController {
  private subscriptionService = new SubscriptionService();
  createSubscription = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const card = req.body as RequestPaymentCardDTO;
      await this.subscriptionService.createSubscription(id, card);
      const { error } = validatePaymentCardData(card);
      if (error) {
        if (error) {
          res.status(400).json(error.details[0].message);
          return;
        }
      }
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  cancelSubscription = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      await this.subscriptionService.cancelSubscription(id);
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  updateSubscriptPaymentMethod = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const card = req.body as RequestPaymentCardDTO;
      const { error } = validatePaymentCardData(card);
      if (error) {
        if (error) {
          res.status(400).json(error.details[0].message);
          return;
        }
      }
      await this.subscriptionService.updateSubscriptionPaymentMethod(id, card);
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
