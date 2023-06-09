import { Individuals } from "../utils/Individuals";
import { FreeQuestions } from "../utils/freeQuestions";

export type RequestFreeQuestion = {
  individual: Individuals;
  questionNum: FreeQuestions;
};
