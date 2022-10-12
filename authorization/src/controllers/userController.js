const userService = require("../services/userService");

class UserController {
  async signUp(req, res) {
    try {
      const { email, password } = req.body;
      await userService.signUp(email, password);
      res.status(200).json({
        message: `Successful registration user with email: ${email}`,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.query;
      const pairTokens = await userService.signIn(email, password);
      res.status(200).json({
        accessToken: pairTokens.accessToken,
        refreshToken: pairTokens.refreshToken,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken: refreshToken } = req;
      const pairTokens = await userService.refresh(refreshToken);
      res.status(200).json(pairTokens);
    } catch (err) {
      res.status(401).json({ message: "Unauthorised" });
    }
  }

  async getMe(req, res) {
    try {
      const response = await userService.getMe(req.url, req.email);
      res.send(response);
    } catch (err) {
      res.status(401).json({ message: "Unauthorised" });
    }
  }
}

module.exports = new UserController();
