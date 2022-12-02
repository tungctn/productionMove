const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
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
      msg: error.message,
    });
  }
};
module.exports.getListUser = async (req, res) => {
  try {
    const listUser = await User.find();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
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
      role: req.body.role,
    }).save();

    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    await User.findByIdAndUpdate(req.params.id, {
      $set: { ...updateOps },
    });
    const newUser = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
