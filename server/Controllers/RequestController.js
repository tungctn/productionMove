const RequestModel = require("../Models/RequestModel");
const UserModel = require("../Models/UserModel");
const ProductModel = require("../Models/ProductModel");
const response = require("../utils/Response");
module.exports.createRequest = async (req, res) => {
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
    // requester: requesterId,
    // recipient: recipientId,
    // status: 1,
    // type: type,
    // product: product,
    // note: note,
    // amount: amount,
    // proudctLine: productLine,
    ...req.body,
    status: 1,
  }).save();
  const requestB = await new RequestModel({
    // requester: requesterId,
    // recipient: recipientId,
    // status: 2,
    // type: type,
    // product: product,
    // note: note,
    // amount: amount,
    // productLine: productLine,
    ...req.body,
    status: 2,
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
  return response.sendSuccessResponse(
    res,
    newRequest,
    "Tạo yêu cầu thành công",
    200
  );
};

module.exports.getRequest = async (req, res) => {
  const request = await RequestModel.findById(req.params.id)
    .populate("product")
    .populate("productLine");
  return response.sendSuccessResponse(res, request, "", 200);
};

module.exports.getAllRequest = async (req, res) => {
  const listRequest = [];
  const user = await UserModel.findById(req.user.id);
  for (const requestID of user.requestList) {
    let request = await RequestModel.findById(requestID)
      .populate("recipient")
      .populate("requester")
      .populate("productLine")
      .populate("product");
    listRequest.push(request);
  }
  return response.sendSuccessResponse(res, listRequest, "", 200);
};

module.exports.handleImportRequest = async (req, res) => {
  const listProduct = await ProductModel.find({
    location: req.user.id,
    productLine: req.body.productLine,
    status: 0,
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
  return response.sendSuccessResponse(
    res,
    null,
    "Chấp nhận yêu cầu thành công",
    200
  );
};
module.exports.updateRequest = async (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  await RequestModel.findByIdAndUpdate(req.params.id, {
    $set: { ...updateOps },
  });
  const newRequest = await RequestModel.findById(req.params.id);
  return response.sendSuccessResponse(
    res,
    newRequest,
    "Cập nhật yêu cầu thành công",
    200
  );
};
module.exports.searchRequest = async (req, res) => {
  let listRequest = [];
  const user = await UserModel.findById(req.user.id);
  for (const requestID of user.requestList) {
    let request = await RequestModel.findById(requestID)
      .populate("recipient")
      .populate("requester")
      .populate("productLine")
      .populate("product");
    listRequest.push(request);
  }
  if (req.body.type || req.body.type === 0) {
    listRequest = listRequest.filter((request) => {
      return request.type === req.body.type;
    });
    if (req.body.status) {
      listRequest = listRequest.filter((request) => {
        return request.status == req.body.status;
      });
      if (req.body.requester) {
        listRequest = listRequest.filter((request) => {
          return request.requester._id == req.body.requester;
        });
      } else {
        listRequest = listRequest;
      }
    } else {
      if (req.body.requester) {
        listRequest = listRequest.filter((request) => {
          return request.requester._id == req.body.requester;
        });
      } else {
        listRequest = listRequest;
      }
    }
  } else {
    if (req.body.status) {
      listRequest = listRequest.filter((request) => {
        return request.status == req.body.status;
      });
      if (req.body.requester) {
        listRequest = listRequest.filter((request) => {
          return request.requester._id == req.body.requester;
        });
      } else {
        listRequest = listRequest;
      }
    } else {
      if (req.body.requester) {
        listRequest = listRequest.filter((request) => {
          return request.requester._id == req.body.requester;
        });
      } else {
        listRequest = listRequest;
      }
    }
  }
  return response.sendSuccessResponse(res, listRequest, "", 200);
};
