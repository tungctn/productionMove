const ProductLineModel = require("../Models/ProductLineModel");
const ProductModel = require("../Models/ProductModel");

module.exports.createProduct = async (req, res, next) => {
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
        factory: req.user.id,
      }).save();
      listProduct.push(product);
    }
    await ProductLineModel.findByIdAndUpdate(req.body.id, {
      amount: productLine.amount + req.body.amount,
    });
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.getAllProduct = async (req, res, next) => {
  try {
    const listProduct = await ProductModel.find({
      location: req.user.id,
    }).populate("productLine");
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "productLine"
    );
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    await ProductModel.findByIdAndUpdate(req.params.id, {
      $set: { ...updateOps },
    });
    const newProduct = await ProductModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
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
