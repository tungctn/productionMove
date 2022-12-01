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
    requester.listRequest.push(requestA._id);
    recipient.listRequest.push(requestB._id);
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
    const listRequest = [];
    for (let id of req.body.listRequest) {
      const request = await RequestModel.findById(id);
      listRequest.push(request);
    }
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

module.exports.updateRequest = async (req, res) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    await RequestModel.findByIdAndUpdate(req.params.id, {
      $set: { ...updateOps },
    });
    const newRequest = await RequestModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
