const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");

productRoute.get(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  // verifyUser.verifyFactory,
  productController.getAllProduct
);

productRoute.get(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  productController.getProduct
);

productRoute.post(
  "/",
  verifyUser.verifyFactory,
  productController.createProduct
);

productRoute.put(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  productController.updateProduct
);

module.exports = productRoute;
