const AuthMiddleware = require("./isLogged");
const response = require("../utils/Response");

module.exports.verifyUser = (role) => {
  return (req, res, next) => {
    AuthMiddleware.verifyToken(req, res, () => {
      if (role.includes(req.user.role)) {
        next();
      } else {
        return response.sendErrorResponse(
          res,
          "Bạn không được quyền truy cập",
          403
        );
      }
    });
  };
};
