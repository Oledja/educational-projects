import { UpdateUserDTO } from "../dto/user/UpdateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import * as dotenv from "dotenv";
import { PhotoService } from "./PhotoService";
import { v4 as uuidv4 } from "uuid";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { S3Service } from "./S3Service";
import { ResponseUserDTO } from "../dto/user/ResponseUserDTO";
import { User } from "../db/schema/schema";
import {
  generateCode,
  isCodeTimeExpired,
} from "../utils/verificationCodeUtils";
import { sendOTP } from "../bot/telegeamBot";
import { UpdateUserPhoneDTO } from "../dto/user/UpdateUserPhoneDTO";

dotenv.config();

const selfieFolder = process.env.SELFIE_S3_FOLDER;
const s3Bucket = process.env.AWS_S3_BUCKET_NAME;
const codeLength = process.env.VERIFICATION_CODE_LENGTH;
const chatId = process.env.TELEGRAM_CHAT_ID;

export class UserService {
  private userRepository = new UserRepository();
  private s3Service = new S3Service();

  getUser = async (userId: User["id"]): Promise<ResponseUserDTO> => {
    try {
      let { id, selfie, name, phone, email } =
        await this.userRepository.getUser(userId);
      if (selfie) {
        const selfieKey = `${selfieFolder}/${selfie}`;
        const selfieUrl = await this.s3Service.getPhotoUrl(selfieKey);
        selfie = selfieUrl;
      }
      return {
        id,
        selfie,
        name,
        phone,
        email,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updatePhoneOTP = async (userId: User["id"], phone: string) => {
    try {
      const code = generateCode(codeLength);
      const update: UpdateUserDTO = {
        verificationCode: code,
        codeGenerationTime: new Date(),
      };
      await this.userRepository.updateUser(userId, update);
      await sendOTP(chatId, code);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateUserPhone = async (userId: string, update: UpdateUserPhoneDTO) => {
    try {
      const { code, phone } = update;
      const { verificationCode, codeGenerationTime } =
        await this.userRepository.getUser(userId);
      if (code !== verificationCode)
        throw new Error("The provided code is incorrect");
      if (isCodeTimeExpired(codeGenerationTime))
        throw new Error("The provided code has expired");
      await this.userRepository.updateUser(userId, {
        verificationCode: "",
        phone,
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateUserName = async (userId: User["id"], name: string) => {
    try {
      await this.userRepository.updateUser(userId, { name });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateUserSelfie = async (userId: User["id"], photo: Express.Multer.File) => {
    try {
      const { buffer, originalname } = photo;
      const key = `${uuidv4()}-${originalname}`;
      const param: PutObjectRequest = {
        Bucket: s3Bucket,
        Key: `${selfieFolder}/${key}`,
        Body: buffer,
      };
      await this.s3Service.savePhoto(param);
      await this.userRepository.updateUser(userId, { selfie: key });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
