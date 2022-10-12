const tokenRepository = require("../repositories/tokenRepository");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET_KEY;
class TokenService {
  async add(userId, refreshToken) {
    await tokenRepository.add(userId, refreshToken);
  }

  async remove(userId) {
    try {
      await tokenRepository.remove(userId);
    } catch (err) {
      throw new Error(
        "Sorry, we have a technical problem, please try again later"
      );
    }
  }

  verifyToken(token) {
    try {
      const { email } = jwt.verify(token, SECRET);
      return email;
    } catch (err) {
      throw new Error(
        "Sorry, we have a technical problem, please try again later"
      );
    }
  }

  generateAccessToken(email) {
    const time = Math.floor(30 + Math.random() * (60 - 30 + 1));
    return jwt.sign({ email }, SECRET, { expiresIn: time + "s" });
  }

  generateRefreshToken() {
    return jwt.sign({}, SECRET, { expiresIn: "30m" });
  }
}

module.exports = new TokenService();
