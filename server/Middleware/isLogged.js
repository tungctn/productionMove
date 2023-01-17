const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const response = require("../utils/Response");
dotenv.config();

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  const tokenCookie = req.cookies["accessToken"];
  if (token || tokenCookie) {
    const accessToken = token?.replace("Bearer ", "");
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return response.sendErrorResponse(
          res,
          "Phiên đăng nhập đã hết hạn",
          403
        );
      }
      req.user = user;
      next();
    });
  } else {
    return response.sendErrorResponse(res, "Bạn cần đăng nhập", 401);
  }
};
