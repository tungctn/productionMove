const productLineRoute = require("express").Router();
const ProductLineController = require("../Controllers/ProductLineController");
const verifyUser = require("../Middleware/verifyUser");
const TryCatch = require("../utils/TryCatch");
const MiddlewareAuth = require("../Middleware/isLogged");

productLineRoute.get(
  "/:id",
  MiddlewareAuth.verifyToken,
  TryCatch(ProductLineController.getProductLine)
);
productLineRoute.get(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(ProductLineController.productLineList)
);

productLineRoute.post(
  "/",
  verifyUser.verifyUser([1]),
  TryCatch(ProductLineController.createProductLine)
);
productLineRoute.put(
  "/:id",
  verifyUser.verifyUser([1]),
  TryCatch(ProductLineController.updateProductLine)
);
productLineRoute.delete(
  "/:id",
  verifyUser.verifyUser([1]),
  TryCatch(ProductLineController.deleteProductLine)
);

productLineRoute.post(
  "/search",
  MiddlewareAuth.verifyToken,
  TryCatch(ProductLineController.searchProductLine)
);
productLineRoute.post(
  "/upload",
  verifyUser.verifyUser([1]),
  TryCatch(ProductLineController.uploadImage)
);
module.exports = productLineRoute;
