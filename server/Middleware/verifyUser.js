const AuthMiddleware = require("./isLogged");
const response = require("../utils/Response");

module.exports.verifyAdmin = (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 1) {
      next();
    } else {
      response.sendErrorResponse(res, "You're not admin", 403);
      // return res.status(403).json({
      //   success: false,
      //   msg: "You're not admin",
      // });
    }
  });
};

module.exports.verifyFactory = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2) {
      next();
    } else {
      response.sendErrorResponse(res, "You're not Factory", 403);
      // return res.status(403).json({
      //   success: false,
      //   msg: "You're not Factory",
      // });
    }
  });
};

module.exports.verifyStore = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 3) {
      next();
    } else {
      response.sendErrorResponse(res, "You're not Store", 403);
      // return res.status(403).json({
      //   success: false,
      //   msg: "You're not Store",
      // });
    }
  });
};

module.exports.verifyWarrantyCenter = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 4) {
      next();
    } else {
      response.sendErrorResponse(res, "You're not Warranty Center", 403);
      // return res.status(403).json({
      //   success: false,
      //   msg: "You're not Warranty Center",
      // });
    }
  });
};

module.exports.verifyFactory_WarrantyCenter_Store = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2 || req.user.role === 3 || req.user.role === 4) {
      next();
    } else {
      response.sendErrorResponse(
        res,
        "You're not Warranty Center or Factory or Store",
        403
      );
      // return res.status(403).json({
      //   success: false,
      //   msg: "You're not Warranty Center or Factory or Store",
      // });
    }
  });
};
