const tokenService = require("../services/tokenService");

const getMeMiddleware = (req, res, next) => {
  try {
    if (req.headers.authorization == undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    req.email = tokenService.verifyToken(accessToken);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = getMeMiddleware;