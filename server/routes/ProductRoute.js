const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");

productRoute.post(
  "/",
  verifyUser.verifyFactory,
  productController.createProduct
);

productRoute.get(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  // verifyUser.verifyFactory,
  productController.getAllProduct
);

productRoute.put("/:id", productController.updateProduct);

module.exports = productRoute;
