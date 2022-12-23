const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged")

productRoute.get(
  "/",
  MiddlewareAuth.verifyToken,
  productController.getAllProduct
);

productRoute.get(
  "/user",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  productController.getProductByUser
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
