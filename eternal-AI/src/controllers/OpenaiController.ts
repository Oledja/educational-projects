import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage";
import { OpenaiService } from "../services/OpenaiService";
import { RequestQuestionDTO } from "../dto/RequestQuestionDTO";
import { CustomRequest } from "../interfaces/CustomRequest";
import { RequestFreeQuestion } from "../dto/RequestFreeQuestionDTO";
import {
  validateFreeQuestionData,
  validateQuestionData,
} from "../utils/validations";

export class OpenaiController {
  private openaiService = new OpenaiService();

  getAnswer = async (req: Request, res: Response) => {
    try {
      const { id } = req as CustomRequest;
      const question = req.body as RequestQuestionDTO;
      const { error } = validateQuestionData(question);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      const response = await this.openaiService.sendQuestion(id, question);
      res.status(200).json({ answer: response });
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };

  getFreeAnswer = async (req: Request, res: Response) => {
    try {
      const question = req.body as RequestFreeQuestion;
      const { error } = validateFreeQuestionData(question);
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
      const response = await this.openaiService.sendFreeQuestion(question);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  };
}
