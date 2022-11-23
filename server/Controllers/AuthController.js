const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthController = {
  genarateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        admin: user.admin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7200s" }
    );
  },

  genarateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
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
        const accessToken = AuthController.genarateAccessToken(user);

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
        msg: error,
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
      });

      const user = await newUser.save();
      return res.status(200).json({
        success: true,
        msg: "successful",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  },

  userLogout: async (req, res, next) => {
    res.clearCookie("accessToken");
    return res.status(200).json({
      success: true,
      msg: "Logout successful",
    });
  },
};

module.exports = AuthController;
