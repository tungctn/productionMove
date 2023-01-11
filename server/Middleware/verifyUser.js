const AuthMiddleware = require("./isLogged");
const response = require("../utils/Response");

module.exports.verifyAdmin = (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 1) {
      next();
    } else {
      return response.sendErrorResponse(
        res,
        "Bạn không thuộc ban điều hành",
        403
      );
    }
  });
};

module.exports.verifyFactory = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2) {
      next();
    } else {
      return response.sendErrorResponse(
        res,
        "Bạn không thuộc cơ sở sản xuất",
        403
      );
    }
  });
};

module.exports.verifyStore = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 3) {
      next();
    } else {
      return response.sendErrorResponse(
        res,
        "Bạn không thuộc đại lý phân phối",
        403
      );
    }
  });
};

module.exports.verifyWarrantyCenter = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 4) {
      next();
    } else {
      return response.sendErrorResponse(
        res,
        "Bạn không thuộc trung tâm bảo hành",
        403
      );
    }
  });
};

module.exports.verifyFactory_WarrantyCenter_Store = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2 || req.user.role === 3 || req.user.role === 4) {
      next();
    } else {
      return response.sendErrorResponse(
        res,
        "Bạn không thuộc cơ sở sản xuất, đại lý phân phối, trung tâm bảo hành",
        403
      );
    }
  });
};

