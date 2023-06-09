import Stripe from "stripe";
import * as dotenv from "dotenv";
import { User } from "../db/schema/schema";
import { getErrorMessage } from "../utils/getErrorMessage";
import { RequestPaymentCardDTO } from "../dto/RequestPaymentCardDTO";
import { UserService } from "./UserService";
import { ResponseSubscriptionDTO } from "../dto/ResponseSubscriptionDTO";

dotenv.config();

const secretKey = process.env.STRIPE_PRIVATE_KEY;
const productId = process.env.PRODUCT_ID;

export class PaymentService {
  private userService = new UserService();
  private stripe = new Stripe(secretKey, { apiVersion: "2022-11-15" });

  createSubscription = async (customerId: string) => {
    try {
      const { id } = await this.getPaymentCustomer(customerId);
      const subscribtion = await this.stripe.subscriptions.create({
        customer: id,
        description: `Subscribe to Eternal AI - Premium
        Premium account on Eternal AI to access premium features.`,
        items: [
          {
            price_data: {
              currency: "usd",
              product: productId,
              recurring: { interval: "month" },
              unit_amount: 1000,
            },
          },
        ],
        payment_settings: {
          payment_method_types: ["card"],
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
      });
      return subscribtion;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  cancelSubscription = async (subscriptionId: string) => {
    try {
      await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  createPaymentCustomer = async (
    userId: User["id"],
    card: RequestPaymentCardDTO
  ): Promise<Stripe.Response<Stripe.Customer>> => {
    try {
      const { email } = await this.userService.getUser(userId);
      const { id: paymentId } = await this.createPaymentMethod(card);
      const params: Stripe.CustomerCreateParams = {
        email,
        payment_method: paymentId,
        invoice_settings: {
          default_payment_method: paymentId,
        },
      };
      const customer = await this.stripe.customers.create(params);
      return customer;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updatePaymentCustomerEmail = async (customerId: string, email: string) => {
    try {
      await this.stripe.customers.update(customerId, { email });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updatePaymentCustomerCard = async (
    customerId: string,
    card: RequestPaymentCardDTO
  ) => {
    try {
      const { id: paymentId } = await this.createPaymentMethod(card);
      const { id } = await this.stripe.paymentMethods.attach(paymentId, {
        customer: customerId,
      });
      await this.stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: id },
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPaymentCustomer = async (
    customerId: string
  ): Promise<Stripe.Response<Stripe.Customer>> => {
    const customer = await this.stripe.customers.retrieve(customerId);
    return customer as Stripe.Response<Stripe.Customer>;
  };

  getSubscriptionInfo = async (
    subscriptionId: string
  ): Promise<ResponseSubscriptionDTO> => {
    try {
      const { status, current_period_end } =
        await this.stripe.subscriptions.retrieve(subscriptionId);
      return {
        isActive: status === "active" ? true : false,
        expiryDate:
          status === "active" ? new Date(current_period_end * 1000) : null,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private createPaymentMethod = async (
    card: RequestPaymentCardDTO
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> => {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: "card",
        card,
      });
      return paymentMethod;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
