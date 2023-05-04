export type UpdateUserDTO = {
  selfie?: string | null;
  phone?: string;
  email?: string;
  verificationCode?: string;
  codeGenerationTime?: Date;
};
