const refreshMiddleware = (req, res, next) => {
  try {
    if (req.headers.authorization == undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.refreshToken = req.headers.authorization.split(" ")[1];
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = refreshMiddleware;