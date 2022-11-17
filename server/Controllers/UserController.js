const User = require("../Models/User");

const UserController = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json({
        success: true,
        msg: "successful",
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error
      });
    }
  },

  getCurrentUser: async(req,res) => {
    try {
      const user = await User.findById(req.user.id)
      return res.status(200).json({
        success: true,
        msg: "successful",
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error
      });
    }
  }
};

module.exports = UserController;
