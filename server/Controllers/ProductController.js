const ProductLineModel = require("../Models/ProductLineModel");
const ProductModel = require("../Models/ProductModel");
const response = require("../utils/Response");
const Mongoose = require("../Models/Mongoose");
const mongoose = new Mongoose();

// before optimize query, time request is 2.51s
// module.exports.createProduct = async (req, res, next) => {
//   const productLine = await ProductLineModel.findById(req.body.id);
//   let listProduct = [];
//   for (
//     let index = productLine.amount;
//     index < productLine.amount + req.body.amount;
//     index++
//   ) {
//     const product = await new ProductModel({
//       productLine: req.body.id,
//       identifier: `${productLine.code}_${index + 1}`,
//       location: req.user.id,
//       factory: req.user.id,
//     }).save();
//     listProduct.push(product);
//   }
//   await ProductLineModel.findByIdAndUpdate(req.body.id, {
//     amount: productLine.amount + req.body.amount,
//   });
//   return response.sendSuccessResponse(
//     res,
//     listProduct,
//     `Nhập thành công ${listProduct.length} sản phẩm`,
//     200
//   );
// };

// after optimize query, time request is 363ms
module.exports.createProduct = async (req, res, next) => {
  const productLine = await ProductLineModel.findById(req.body.id);

  const newProducts = [];

  for (
    let index = productLine.amount;
    index < productLine.amount + req.body.amount;
    index++
  ) {
    const product = {
      productLine: req.body.id,
      identifier: `${productLine.code}_${index + 1}`,
      location: req.user.id,
      factory: req.user.id,
    };

    newProducts.push(product);
  }

  const createdProducts = await ProductModel.insertMany(newProducts);

  await ProductLineModel.findByIdAndUpdate(req.body.id, {
    amount: productLine.amount + req.body.amount,
  });

  return response.sendSuccessResponse(
    res,
    createdProducts,
    `Nhập thành công ${createdProducts.length} sản phẩm`,
    200
  );
};

module.exports.getProductByUser = async (req, res, next) => {
  const listProduct = await ProductModel.find({
    location: req.user.id,
  }).populate([{ path: "productLine", select: "" }]);
  return response.sendSuccessResponse(res, listProduct, "", 200);
};

module.exports.getAllProduct = async (req, res, next) => {
  const listProduct = await ProductModel.find().populate([
    { path: "productLine", select: "" },
  ]);

  return response.sendSuccessResponse(res, listProduct, "", 200);
};

module.exports.getProduct = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id).populate([
    { path: "productLine", select: "" },
    { path: "factory", select: "" },
    { path: "location", select: "" },
    { path: "store", select: "" },
  ]);
  return response.sendSuccessResponse(res, product, "", 200);
};

module.exports.updateProduct = async (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  await ProductModel.findByIdAndUpdate(req.params.id, {
    $set: { ...updateOps },
  });
  const newProduct = await ProductModel.findById(req.params.id);
  return response.sendSuccessResponse(
    res,
    newProduct,
    "Cập nhật sản phẩm thành công",
    200
  );
};

module.exports.deleteProduct = async (req, res, next) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return response.sendSuccessResponse(
    res,
    null,
    "Xoá sản phẩm thành công",
    200
  );
};

module.exports.searchProduct = async (req, res, next) => {
  req.body.input = req.body.input?.toUpperCase();
  let listProduct = await ProductModel.find({
    location: req.user.id,
  }).populate("productLine");
  if (req.body.status || req.body.status === 0) {
    listProduct = listProduct.filter((item) => {
      return item.status == req.body.status;
    });
    if (req.body.prdl) {
      listProduct = listProduct.filter((item) => {
        return item.productLine._id == req.body.prdl;
      });
      if (req.body.input) {
        listProduct = listProduct.filter((item) => {
          return item.identifier.includes(req.body.input);
        });
      } else {
        listProduct = listProduct;
      }
    } else {
      if (req.body.input) {
        listProduct = listProduct.filter((item) => {
          return item.identifier.includes(req.body.input);
        });
      } else {
        listProduct = listProduct;
      }
    }
  } else {
    if (req.body.prdl) {
      listProduct = listProduct.filter((item) => {
        return item.productLine._id == req.body.prdl;
      });
      if (req.body.input) {
        listProduct = listProduct.filter((item) => {
          return item.identifier.includes(req.body.input);
        });
      } else {
        listProduct = listProduct;
      }
    } else {
      if (req.body.input) {
        listProduct = listProduct.filter((item) => {
          return item.identifier.includes(req.body.input);
        });
      } else {
        listProduct = listProduct;
      }
    }
  }
  return response.sendSuccessResponse(res, listProduct, "successful", 200);
};
