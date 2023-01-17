const ProductModel = require("../Models/ProductModel");
const UserModel = require("../Models/UserModel");
const response = require("../utils/Response");

module.exports.quantityInStock = async (req, res, next) => {
    const listFactory = await UserModel.find({ role: 2 });
    const quantityInStock = [];
    for (let factory of listFactory) {
      const listProduct = await ProductModel.find({
        productLine: req.body.productLine,
        location: factory._id,
        status: 0,
      });
      quantityInStock.push({ factory: factory, listProduct: listProduct });
    }
    return response.sendSuccessResponse(res, quantityInStock, "", 200);
};


