import { sendCode } from "../bot/telegeamBot";
import { LoginResponse } from "../dto/LoginResponse";
import { CreateUserDTO } from "../dto/user/CreateUserDTO";
import { UpdateUserDTO } from "../dto/user/UpdateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { generateAccessToken } from "../utils/tokenGenerator";
import {
  generateCode,
  isCodeTimeExpired,
} from "../utils/verificationCodeUtils";
import { S3Service } from "./S3Service";
import * as dotenv from "dotenv";

dotenv.config();

const codeLength = process.env.VERIFICATION_CODE_LENGTH;
const chatId = process.env.TELEGRAM_CHAT_ID;
const selfieFolder = process.env.SELFIE_S3_FOLDER;

export class RegistrationService {
  private userRepository = new UserRepository();
  private s3Service = new S3Service();

  login = async (phone: string, code: string): Promise<LoginResponse> => {
    try {
      const user = await this.userRepository.getUserByPhone(phone);
      if (!user) throw new Error(`User with phone: <${phone}> doesn't exists`);
      const { id, verificationCode, codeGenerationTime, selfie } = user;
      if (code !== verificationCode)
        throw new Error("The provided code is incorrect");
      if (isCodeTimeExpired(codeGenerationTime))
        throw new Error("The provided code has expired");
      await this.userRepository.updateUser(id, { verificationCode: "" });
      if (selfie) {
        const selfieKey = `${selfieFolder}/${selfie}`;
        const selfieUrl = await this.s3Service.getPhotoUrl(selfieKey);
        user.selfie = selfieUrl;
      }
      const responseUser = {
        id: user.id,
        selfie: user.selfie,
        phone: user.phone,
        email: user.email,
      };
      const token = generateAccessToken(user.id);
      return {
        user: responseUser,
        accessToken: token,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  verification = async (phone: string) => {
    try {
      const user = await this.userRepository.getUserByPhone(phone);
      const code = generateCode(codeLength);
      if (user) {
        const update: UpdateUserDTO = {
          verificationCode: code,
          codeGenerationTime: new Date(),
        };
        await this.userRepository.updateUser(user.id, update);
      } else {
        const create: CreateUserDTO = {
          phone,
          verificationCode: code,
          codeGenerationTime: new Date(),
        };
        await this.userRepository.createUser(create);
      }
      await sendCode(chatId, code, phone);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
