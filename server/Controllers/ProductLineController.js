const ProductLineModel = require("../Models/ProductLineModel");
const response = require("../utils/Response");
const ProductModel = require("../Models/ProductModel");

module.exports.createProductLine = async (req, res, next) => {
  const newProductLine = await new ProductLineModel({
    ...req.body,
  }).save();
  return response.sendSuccessResponse(
    res,
    newProductLine,
    "Tạo dòng sản phẩm thành công",
    200
  );
};

module.exports.getProductLine = async (req, res, next) => {
  const productLine = await ProductLineModel.findById(req.params.id);
  return response.sendSuccessResponse(res, productLine, "", 200);
};

module.exports.updateProductLine = async (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  await ProductLineModel.findByIdAndUpdate(req.params.id, {
    $set: { ...updateOps },
  });
  const newProduct = await ProductLineModel.findById(req.params.id);
  return response.sendSuccessResponse(
    res,
    newProduct,
    "Cập nhật thành công",
    200
  );
};

module.exports.deleteProductLine = async (req, res, next) => {
  await ProductLineModel.findByIdAndDelete(req.params.id);
  await ProductModel.deleteMany({ productLine: req.params.id });
  return response.sendSuccessResponse(res, null, "Xoá thành công", 200);
};

module.exports.productLineList = async (req, res, next) => {
  const listProductLine = await ProductLineModel.find();

  return response.sendSuccessResponse(res, listProductLine, "", 200);
};

module.exports.searchProductLine = async (req, res, next) => {
  const listProductLine = await ProductLineModel.find({
    name: { $regex: req.body.input, $options: "?i" },
  });
  return response.sendSuccessResponse(res, listProductLine, "", 200);
};
