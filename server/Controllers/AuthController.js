const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const response = require("../utils/Response");
dotenv.config();

module.exports.genarateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      role: user.role,
      requestList: user.requestList,
      img: user.img,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports.loginUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return response.sendErrorResponse(res, "Email không tồn tại", 404);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return response.sendErrorResponse(res, "Sai mật khẩu", 404);
  }

  if (user && validPassword) {
    const accessToken = this.genarateAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      samSite: "strict",
    });
    return res.status(200).json({
      success: true,
      data: user,
      accessToken: accessToken,
      msg: "Đăng nhập thành công",
    });
  }
};

module.exports.userLogout = async (req, res, next) => {
  res.clearCookie("accessToken");
  return response.sendSuccessResponse(res, "", "Đăng xuất thành công", 200);
};
