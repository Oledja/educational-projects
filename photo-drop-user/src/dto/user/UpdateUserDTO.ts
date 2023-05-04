export type UpdateUserDTO = {
  selfie?: string | null;
  name?: string;
  phone?: string;
  email?: string;
  verificationCode?: string;
  codeGenerationTime?: Date;
};
