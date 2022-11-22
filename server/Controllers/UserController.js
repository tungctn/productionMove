const User = require("../Models/User");
const bcrypt = require("bcrypt");
// const UserController = {
//   getAllUser: async (req, res) => {
//     try {
//       const user = await User.find();
//       return res.status(200).json({
//         success: true,
//         msg: "successful",
//         data: user,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         msg: error,
//       });
//     }
//   },

//   getCurrentUser: async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id);
//       return res.status(200).json({
//         success: true,
//         msg: "successful",
//         data: user,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         msg: error,
//       });
//     }
//   },
// };

module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
};


module.exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt .genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({
        success: false,
        msg: "Email exist",
      });
    }
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    }).save();

    // const newUser = await newUser.save();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
