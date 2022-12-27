const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged");
const TryCatch = require("../utils/TryCatch");

productRoute.get(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(productController.getAllProduct)
  // productController.getAllProduct
);

productRoute.get(
  "/user",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.getProductByUser)
  // productController.getProductByUser
);

productRoute.get(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.getProduct)
  // productController.getProduct
);

productRoute.post(
  "/",
  verifyUser.verifyFactory,
  TryCatch(productController.createProduct)
  // productController.createProduct
);

productRoute.put(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.updateProduct)
  // productController.updateProduct
);

productRoute.post(
  "/search",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.searchProduct)
)

module.exports = productRoute;
