import { User } from "../db/schema/schema";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { ResponseLoginDTO } from "../dto/ResponseLoginDTO";
import { getGoogleEnv } from "../utils/envUtils";
import { getErrorMessage } from "../utils/getErrorMessage";
import { sendMail } from "../utils/mailSender";
import { generateAccessToken } from "../utils/tokenGenerator";
import { generateRecoveryCode } from "../utils/recoveryCodeUtils";
import { GoogleAuthService } from "./GoogleAuthService";
import { SubscriptionService } from "./SubscriptionService";
import { UserService } from "./UserService";

const clientId = getGoogleEnv("GOOGLE_CLIENT_ID");
const clientSecret = getGoogleEnv("GOOGLE_CLIENT_SECRET");
const redirectUri = getGoogleEnv("GOOGLE_REDIRECT_URL");

export class AuthService {
  private userService = new UserService();
  private subscriptionService = new SubscriptionService();
  private googleAuthService = new GoogleAuthService(
    clientId,
    clientSecret,
    redirectUri
  );

  login = async (login: CreateUserDTO): Promise<ResponseLoginDTO> => {
    try {
      const user = await this.userService.getUserByEmail(login.email);
      if (user.password !== login.password)
        throw new Error("Email or password is incorrect");
      const { id, email, name, phone } = user;
      const accessToken = generateAccessToken(id);
      const subscription = await this.subscriptionService.getSubscriptionInfo(
        id
      );
      return {
        user: {
          id,
          email,
          name,
          phone,
        },
        subscription,
        accessToken,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  signUp = async (create: CreateUserDTO): Promise<ResponseLoginDTO> => {
    try {
      const isUserExists = await this.userService.isUserExists(create.email);
      if (isUserExists)
        throw new Error(`User with email: <${create.email}> already exists`);
      const { id, email, name, phone } = await this.userService.createUser(
        create
      );
      const accessToken = generateAccessToken(id);
      const subscription = await this.subscriptionService.getSubscriptionInfo(
        id
      );
      return {
        user: {
          id,
          email,
          name,
          phone,
        },
        subscription,
        accessToken,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  signUpGoogle = async (code: string): Promise<ResponseLoginDTO> => {
    try {
      const userInfo = await this.googleAuthService.getUserInfo(code);
      const isUserExists = await this.userService.isUserExists(userInfo.email);
      if (!isUserExists)
        await this.userService.createUser({
          email: userInfo.email,
          name: userInfo.name,
        });
      const { id, email, name, phone } = await this.userService.getUserByEmail(
        userInfo.email
      );
      const accessToken = generateAccessToken(id);
      const subscription = await this.subscriptionService.getSubscriptionInfo(
        id
      );

      return {
        user: {
          id,
          email,
          name,
          phone,
        },
        subscription,
        accessToken,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getGoogleAuthUri = (): string => {
    try {
      return this.googleAuthService.getAuthUrl();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  sendRecoveryCode = async (email: User["email"]) => {
    try {
      const { id, name } = await this.userService.getUserByEmail(email);
      const recoveryCode = generateRecoveryCode();
      const recoveryCodeCreatedAt = new Date();
      await sendMail(email, name, recoveryCode);
      await this.userService.updateUser(id, {
        recoveryCode,
        recoveryCodeCreatedAt,
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
