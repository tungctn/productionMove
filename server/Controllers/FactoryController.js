const ProductModel = require("../Models/ProductModel");
const UserModel = require("../Models/UserModel");
const response = require("../utils/Response");

module.exports.quantityInStock = async (req, res, next) => {
  // try {
    const listFactory = await UserModel.find({ role: 2 });
    const quantityInStock = [];
    for (let factory of listFactory) {
      const listProduct = await ProductModel.find({
        productLine: req.body.productLine,
        location: factory.id,
        status: 0,
      });
      quantityInStock.push({ factory: factory, listProduct: listProduct });
    }
    // return res.status(200).json({
    //   success: true,
    //   msg: "successful",
    //   data: quantityInStock,
    // });
    return response.sendSuccessResponse(res, quantityInStock, "", 200);
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     msg: error.message,
  //   });
  // }
};


