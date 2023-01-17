const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const response = require("../utils/Response");

module.exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  return response.sendSuccessResponse(res, user, "", 200);
};

module.exports.getListUser = async (req, res) => {
  const listUser = await User.find({ role: { $in: [2, 3, 4] } });
  return response.sendSuccessResponse(res, listUser, "", 200);
};

module.exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  return response.sendSuccessResponse(res, user, "", 200);
};

module.exports.createUser = async (req, res) => {
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
  return response.sendSuccessResponse(
    res,
    newUser,
    "Tạo thành công người dùng",
    200
  );
};

module.exports.updateUser = async (req, res) => {
  const updateOps = {};
  if (req.user.id !== req.params.id && req.user.role !== 1) {
    return response.sendErrorResponse(
      res,
      "Không thể cập nhật nguời khác",
      500
    );
  } else {
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    await User.findByIdAndUpdate(req.params.id, {
      $set: { ...updateOps },
    });
    const newUser = await User.findById(req.params.id);
    return response.sendSuccessResponse(
      res,
      newUser,
      "Cập nhật thành công người dùng",
      200
    );
  }
};

module.exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return response.sendSuccessResponse(
    res,
    null,
    "Xoá người dùng thành công",
    200
  );
};

module.exports.searchUser = async (req, res) => {
  const filter = req.body.filter;
  let listUser = [];
  if (req.body.role) {
    if (req.body.input && filter) {
      listUser = await User.find({
        role: req.body.role,
        $or: [{ [filter]: { $regex: req.body.input, $options: "?i" } }],
      });
    } else {
      listUser = await User.find({
        role: req.body.role,
      });
    }
  } else {
    if (req.body.input && filter) {
      listUser = await User.find({
        $or: [{ [filter]: { $regex: req.body.input, $options: "i" } }],
      });
    } else {
      listUser = await User.find();
    }
  }
  return response.sendSuccessResponse(res, listUser, "", 200);
};

module.exports.changePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return response.sendErrorResponse(res, "Mật khẩu không đúng", 500);
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.newPassword, salt);
  user.password = hashed;
  await user.save();
  return response.sendSuccessResponse(
    res,
    null,
    "Đổi mật khẩu thành công",
    200
  );
};

module.exports.checkPassword = async (req, res) => {
  const validPassword = await bcrypt.compare(
    req.body.password,
    req.body.current
  );
  if (!validPassword) {
    return response.sendErrorResponse(res, "Mật khẩu không đúng", 500);
  }
  return response.sendSuccessResponse(res, null, "", 200);
};

module.exports.checkEmail = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user) {
    return response.sendErrorResponse(res, "Email đã tồn tại", 500);
  }
  return response.sendSuccessResponse(res, null, "", 200);
};
