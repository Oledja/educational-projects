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

dotenv.config();

const selfieFolder = process.env.SELFIE_S3_FOLDER;
const s3Bucket = process.env.AWS_S3_BUCKET_NAME;

export class UserService {
  private userRepository = new UserRepository();
  private photoService = new PhotoService();
  private s3Service = new S3Service();

  getUser = async (userId: User["id"]): Promise<ResponseUserDTO> => {
    try {
      const user = await this.userRepository.getUser(userId);
      if (user.selfie) {
        const selfieKey = `${selfieFolder}/${user.selfie}`;
        const selfieUrl = await this.s3Service.getPhotoUrl(selfieKey);
        user.selfie = selfieUrl;
      }
      return {
        id: user.id,
        selfie: user.selfie,
        name: user.name,
        phone: user.phone,
        email: user.email,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateUser = async (userId: User["id"], update: UpdateUserDTO) => {
    try {
      await this.userRepository.updateUser(userId, update);
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
      const { selfie } = await this.userRepository.getUser(userId);
      if (selfie) {
        const key = `${selfieFolder}/${selfie}`;
        await this.s3Service.deletePhoto(key);
      }
      await this.userRepository.updateUser(userId, { selfie: key });
      await this.s3Service.savePhoto(param);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteUserSelfie = async (userId: User["id"]) => {
    try {
      const { selfie } = await this.userRepository.getUser(userId);
      if (!selfie)
        throw new Error(`Selfie for user with id: <${userId}> was not set`);
      const key = `${selfieFolder}/${selfie}`;
      await this.s3Service.deletePhoto(key);
      await this.userRepository.updateUser(userId, { selfie: null });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteUser = async (userId: User["id"]) => {
    try {
      const { selfie } = await this.userRepository.getUser(userId);
      if (selfie) {
        const key = `${selfieFolder}/${selfie}`;
        await this.s3Service.deletePhoto(key);
      }
      await this.photoService.unmarkUserOnPhotos(userId);
      await this.userRepository.deleteUser(userId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
