const freeQuestion: Map<string, string> = new Map([
  ["1", "What did you want to be when you grew up?"],
  ["2", "What is the meaning of life?"],
  ["3", "What is your greatest accomplishment?"],
]);

export type FreeQuestions = "1" | "2" | "3";

export const getFreeQuestion = (questionNum: FreeQuestions): string => {
  const question = freeQuestion.get(questionNum);
  if (!question)
    throw new Error(
      `Question not supported, available values: ${Array.from(freeQuestion)}`
    );
  return question;
};
