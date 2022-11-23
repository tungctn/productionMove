const AuthMiddleware = require("./isLogged");

module.exports.verifyFactory = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not factory",
      });
    }
  });
};

module.exports.verifyAdmin = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.admin) {
      next();
      return res.status(200).json({
        success: true,
        msg: "successful",
      });
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not admin",
      });
    }
  });
};
