const ProductLineModel = require("../Models/ProductLineModel");
const ProductModel = require("../Models/ProductModel");


module.exports.productCreate = async (req, res, next) => {
  try {
    const productLine = await ProductLineModel.findById(req.body.id);
    var listProduct = [];
    for (
      let index = productLine.amount;
      index < productLine.amount + req.body.amount;
      index++
    ) {
      const product = await new ProductModel({
        productLine: req.body.id,
        identifier: `${productLine.code}_${index + 1}`,
        location: req.user.id,
      }).save();
      listProduct.push(product);
    }
    await ProductLineModel.findByIdAndUpdate(req.body.id, {
      amount: productLine.amount + req.body.amount,
    });
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listProduct
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

module.exports.productList = async (req, res, next) => {
  try {
    const listProduct = await ProductModel.find();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
