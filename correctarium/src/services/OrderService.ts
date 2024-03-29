import CreateOrder from "../interfaces/CreateOrder";
import ReadOrder from "../interfaces/Order";
import {
  getDeadline,
  getPrice,
  getTime,
  prepareResponse,
} from "../utils/orderUtils";

class OrderService {
  makeOrder = (create: CreateOrder): ReadOrder => {
    try {
      const { language, mimeType, count } = create;
      const amountLetters = language === "en" ? 333 : 1333;
      const price = language === "en" ? 0.12 : 0.05;
      const mimetypeCoef = mimeType === "other" ? 1.2 : 1;
      const totalPrice = getPrice(price, mimetypeCoef, count);
      const time = getTime(amountLetters, mimetypeCoef, count);
      const deadline = getDeadline(new Date(), time);
      const response = prepareResponse(totalPrice, time, deadline);
      return response;
    } catch (err) {
      throw err;
    }
  };
}

export default OrderService;
