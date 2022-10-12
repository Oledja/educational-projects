const usersRepository = require("../repositories/userRepository");
const tokenService = require("./tokenService");
const tokenRepository = require("../repositories/tokenRepository");
const { generateAccessToken, generateRefreshToken } = require("./tokenService");

class UserService {
  async signUp(email, password) {
    try {
      const candidate = await usersRepository.findByEmail({ email });
      if (candidate) throw Error(`user with email: ${email} aready exists`);
      return await usersRepository.save({ email, password });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async signIn(email, password) {
    try {
      const user = await usersRepository.findByEmail({ email });
      if (!user || password != user.password) {
        throw new Error(`The username or password is incorrect`);
      }
      await tokenService.remove(user._id);
      const accessToken = generateAccessToken(email);
      const refreshToken = generateRefreshToken();
      await tokenRepository.save(user._id, refreshToken);
      return { accessToken, refreshToken };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async refresh(token) {
    const { refreshToken: tokenFromDB, userId: userId } =
      await tokenRepository.find(token);
    if (!tokenFromDB) {
      throw new Error("Unauthorised");
    }
    try {
      tokenService.verifyToken(tokenFromDB);
      const { email } = await usersRepository.findByEmail({ _id: userId });
      const accessToken = generateAccessToken(email);
      const refreshToken = generateRefreshToken();
      return { accessToken, refreshToken };
    } catch (err) {
      throw new Error("Unauthorised");
    }
  }

  getMe(url, email) {
    return {
      request_num: url,
      data: {
        username: email,
      },
    };
  }
}

module.exports = new UserService();
