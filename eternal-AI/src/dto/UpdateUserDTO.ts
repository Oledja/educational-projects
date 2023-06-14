export type UpdateUserDTO = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  numberOfFreeQuestions?: number;
  recoveryCode?: string;
  recoveryCodeCreatedAt?: Date;
};
