const RequestModel = require("../Models/RequestModel");
const UserModel = require("../Models/UserModel");

module.exports.createRequest = async (req, res) => {
  try {
    const requesterId = req.body.requester;
    const recipientId = req.body.recipient;
    const requester = await UserModel.findById(requesterId);
    const recipient = await UserModel.findById(recipientId);

    const type = req.body.type;
    const requestA = await new RequestModel({
      requester: requesterId,
      recipient: recipientId,
      status: 1,
      type: type,
    }).save();
    const requestB = await new RequestModel({
      requester: requesterId,
      recipient: recipientId,
      status: 2,
      type: type,
    }).save();
    requester.requestList.push(requestA._id);
    recipient.requestList.push(requestB._id);
    requester.save();
    recipient.save();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: "",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.getRequest = async (req, res) => {
  try {
    const request = RequestModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.getAllRequest = async (req, res) => {
  try {
    const allRequest = RequestModel.find({requester: req.body.id});
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: allRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};