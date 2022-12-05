const ProductModel = require("../Models/ProductModel");
const UserModel = require("../Models/UserModel");

module.exports.quantityInStock = async (req, res, next) => {
  try {
    const listFactory = await UserModel.find({ role: 2 });
    const quantityInStock = [];
    for (let factory of listFactory) {
      const listProduct = await ProductModel.find({
        productLine: req.body.productLine,
        location: factory.id,
      });
      quantityInStock.push({ factory: factory, amount: listProduct.length });
    }
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: quantityInStock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
