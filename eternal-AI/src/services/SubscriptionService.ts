import { User } from "../db/schema/schema";
import { RequestPaymentCardDTO } from "../dto/RequestPaymentCardDTO";
import { SubscriptionRepository } from "../repositories/SubscriptionRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PaymentService } from "./PaymentService";
import { ResponseSubscriptionDTO } from "../dto/ResponseSubscriptionDTO";

export class SubscriptionService {
  private subscriptionRepository = new SubscriptionRepository();
  private paymentService = new PaymentService();

  createSubscription = async (
    userId: User["id"],
    card: RequestPaymentCardDTO
  ) => {
    try {
      const subscription = await this.subscriptionRepository.getSubscription(
        userId
      );
      if (subscription) {
        const { customerId } = subscription;
        const { id: subscriptionId } =
          await this.paymentService.createSubscription(customerId);
        await this.subscriptionRepository.updateSubscription(userId, {
          subscriptionId,
        });
      } else {
        const { id: customerId } =
          await this.paymentService.createPaymentCustomer(userId, card);
        const { id: subscriptionId } =
          await this.paymentService.createSubscription(customerId);
        const create = {
          userId,
          customerId,
          subscriptionId,
        };
        await this.subscriptionRepository.createSubscription(create);
      }
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
  cancelSubscription = async (userId: User["id"]) => {
    try {
      const subscribtion = await this.subscriptionRepository.getSubscription(
        userId
      );
      if (!subscribtion) throw new Error("Subscription doesn't exists");
      const { subscriptionId } = subscribtion;
      await this.paymentService.cancelSubscription(subscriptionId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
  updateSubscriptionPaymentMethod = async (
    userId: User["id"],
    card: RequestPaymentCardDTO
  ) => {
    try {
      const subscribtion = await this.subscriptionRepository.getSubscription(
        userId
      );
      if (!subscribtion) throw new Error("Subscription doesn't exists");
      const { customerId } = subscribtion;
      await this.paymentService.updatePaymentCustomerCard(customerId, card);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getSubscriptionInfo = async (
    userId: User["id"]
  ): Promise<ResponseSubscriptionDTO> => {
    try {
      let result: ResponseSubscriptionDTO;
      const subscription = await this.subscriptionRepository.getSubscription(
        userId
      );
      if (!subscription) {
        result = {
          isActive: false,
          expiryDate: null,
        };
      } else {
        const { subscriptionId } = subscription;
        result = await this.paymentService.getSubscriptionInfo(subscriptionId);
      }
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
