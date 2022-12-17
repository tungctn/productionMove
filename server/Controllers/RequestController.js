const RequestModel = require("../Models/RequestModel");
const UserModel = require("../Models/UserModel");
const ProductModel = require("../Models/ProductModel");
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
      productLine: productLine,
    }).save();
    requestA.refRequest = requestB._id;
    requestB.refRequest = requestA._id;
    requestA.save();
    requestB.save();
    requester.requestList.push(requestA._id);
    recipient.requestList.push(requestB._id);
    requester.save();
    recipient.save();
    const newRequest = await RequestModel.findById(requestA._id)
      .populate("recipient")
      .populate("requester");
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
        .populate("requester")
        .populate("productLine");
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

module.exports.handleImportRequest = async (req, res) => {
  try {
    const listProduct = await ProductModel.find({
      location: req.user.id,
      productLine: req.body.productLine,
    });
    if (req.body.amount > listProduct.length) {
      return res.status(200).json({
        success: false,
        msg: `${req.user.name} không còn đủ sản phẩm`,
      });
    } else {
      for (let i = 0; i < req.body.amount; i++) {
        listProduct[i].store = req.body.store;
        listProduct[i].location = req.body.store;
        listProduct[i].status = 1;
        listProduct[i].save();
      }
    }
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
module.exports.updateRequest = async (req, res, next) => {
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
