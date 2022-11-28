const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  const tokenCookie = req.cookies["accessToken"];
  if (token && tokenCookie) {
    // const accessToken = token.split(" ")[1];
    const accessToken = token.replace('Bearer ','');
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          msg: "token is not valid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      msg: "you are not authenticated",
    });
  }
};
