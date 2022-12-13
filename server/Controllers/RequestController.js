const RequestModel = require("../Models/RequestModel");
const UserModel = require("../Models/UserModel");

module.exports.createRequest = async (req, res) => {
  try {
    const requesterId = req.body.requester;
    const recipientId = req.body.recipient;
    const requester = await UserModel.findById(requesterId);
    const recipient = await UserModel.findById(recipientId);
    const product = req.body.product;
    const type = req.body.type;
    const note = req.body.note;
    const amount = req.body.amount;
    const productLine = req.body.productLine;
    const requestA = await new RequestModel({
      requester: requesterId,
      recipient: recipientId,
      status: 1,
      type: type,
      product: product,
      note: note,
      amount: amount,
      proudctLine: productLine,
    }).save();
    const requestB = await new RequestModel({
      requester: requesterId,
      recipient: recipientId,
      status: 2,
      type: type,
      product: product,
      note: note,
      amount: amount,
      proudctLine: productLine,
    }).save();
    requester.requestList.push(requestA._id);
    recipient.requestList.push(requestB._id);
    requester.save();
    recipient.save();
    const newRequest = await RequestModel.findById(requestA._id).populate("recipient").populate("requester");
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

module.exports.getRequest = async (req, res) => {
  try {
    const request = await RequestModel.findById(req.params.id);
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
    const listRequest = [];
    for (const requestID of req.user.requestList) {
      let request = await RequestModel.findById(requestID)
        .populate("recipient")
        .populate("requester");
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
      msg: error.message,
    });
  }
};
