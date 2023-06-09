import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import { getIndividual } from "../utils/Individuals";
import { getErrorMessage } from "../utils/getErrorMessage";
import { getFreeQuestion } from "../utils/freeQuestions";
import { RequestQuestionDTO } from "../dto/RequestQuestionDTO";
import { User } from "../db/schema/schema";
import { UserService } from "./UserService";
import { RequestFreeQuestion } from "../dto/RequestFreeQuestionDTO";
import { SubscriptionService } from "./SubscriptionService";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

export class OpenaiService {
  private configuration = new Configuration({ apiKey });
  private openai = new OpenAIApi(this.configuration);
  private userService = new UserService();
  private subscriptionService = new SubscriptionService();

  sendQuestion = async (userId: User["id"], question: RequestQuestionDTO) => {
    try {
      const user = await this.userService.getUser(userId);
      const { isActive } = await this.subscriptionService.getSubscriptionInfo(
        userId
      );
      let { numberOfFreeQuestions } = user;
      if (numberOfFreeQuestions <= 0 && isActive === false)
        throw new Error("You ran out of free questions");
      if (isActive === false) {
        numberOfFreeQuestions -= 1;
      }
      await this.userService.updateUser(userId, { numberOfFreeQuestions });
      const answer = await this.getAnswer(question);
      return answer;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  sendFreeQuestion = async (question: RequestFreeQuestion) => {
    try {
      const answer = this.getFreeAnswer(question);
      return answer;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private getAnswer = async (question: RequestQuestionDTO) => {
    try {
      const { individual, message } = question;
      const individualName = getIndividual(individual);
      const completion = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are an impersonator. Your job is to impersonate the given famous individual below.
            You will also have the personality and knowledge of the given individual. Avoid long responses.
            Famous Individual:  ${individualName}
            ${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      return completion.data.choices[0].text;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private getFreeAnswer = async (question: RequestFreeQuestion) => {
    try {
      const { individual, questionNum } = question;
      const message = getFreeQuestion(questionNum);
      const answer = await this.getAnswer({ individual, message });
      return answer;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
