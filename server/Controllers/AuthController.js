const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.genarateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "wrong email",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).json({
        success: false,
        msg: "wrong password",
      });
    }

    if (user && validPassword) {
      const accessToken = this.genarateAccessToken(user)

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        samSite: "strict",
      });
      res.status(200).json({
        success: true,
        data: user,
        accessToken: accessToken,
        msg: "successful",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};


module.exports.userLogout = async (req, res, next) => {
  res.clearCookie("accessToken");
  return res.status(200).json({
    success: true,
    msg: "Logout successful",
  });
}
