const AuthMiddleware = require("./isLogged");

module.exports.verifyAdmin = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 1) {
      next();
      return res.status(200).json({
        success: true,
        msg: "successful",
      });
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not Admin",
      });
    }
  });
};

module.exports.verifyFactory = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not Factory",
      });
    }
  });
};

module.exports.verifyStore = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 3) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not Store",
      });
    }
  });
};

module.exports.verifyWarrantyCenter = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 4) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not Warranty Center",
      });
    }
  });
};