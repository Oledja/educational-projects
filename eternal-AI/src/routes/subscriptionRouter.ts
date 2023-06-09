import { Router } from "express";
import { auth } from "../middlewares/auth";
import { SubscriptionController } from "../controllers/SubscriptionController";

const subscriptionRouter = Router();
const subscriptionController = new SubscriptionController();

subscriptionRouter.post(
  "/subscriptions/create",
  auth,
  subscriptionController.createSubscription
);
subscriptionRouter.patch(
  "/subscriptions/update",
  auth,
  subscriptionController.updateSubscriptPaymentMethod
);
subscriptionRouter.patch(
  "/subscriptions/cancel",
  auth,
  subscriptionController.cancelSubscription
);

export { subscriptionRouter };
