const productLineRoute = require("express").Router();
const ProductLineController = require("../Controllers/ProductLineController");
const verifyUser = require("../Middleware/verifyUser");
const TryCatch = require("../utils/TryCatch");
const MiddlewareAuth = require("../Middleware/isLogged");

productLineRoute.get("/:id", TryCatch(ProductLineController.getProductLine));
productLineRoute.get(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(ProductLineController.productLineList)
);

productLineRoute.post(
  "/",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.createProductLine)
);
productLineRoute.put(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.updateProductLine)
);
productLineRoute.delete(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.deleteProductLine)
);

productLineRoute.post(
  "/search",
  MiddlewareAuth.verifyToken,
  TryCatch(ProductLineController.searchProductLine)
);
productLineRoute.post(
  "/upload",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.uploadImage)
);
module.exports = productLineRoute;
