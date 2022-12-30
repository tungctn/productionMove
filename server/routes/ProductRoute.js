const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged");
const TryCatch = require("../utils/TryCatch");

productRoute.get(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(productController.getAllProduct)
);

productRoute.get(
  "/user",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.getProductByUser)
);

productRoute.get(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.getProduct)
);

productRoute.post(
  "/",
  verifyUser.verifyFactory,
  TryCatch(productController.createProduct)
);

productRoute.put(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.updateProduct)
);

productRoute.delete(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.deleteProduct)
);

productRoute.post(
  "/search",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(productController.searchProduct)
)

module.exports = productRoute;
