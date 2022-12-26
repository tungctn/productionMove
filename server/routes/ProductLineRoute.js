const productLineRoute = require("express").Router();
const ProductLineController = require("../Controllers/ProductLineController");
const verifyUser = require("../Middleware/verifyUser");
const TryCatch = require("../utils/TryCatch");
const MiddlewareAuth = require("../Middleware/isLogged");

productLineRoute.get("/:id", TryCatch(ProductLineController.getProductLine));
productLineRoute.get(
  "/",
  // verifyUser.verifyFactory_WarrantyCenter_Store,
  MiddlewareAuth.verifyToken,
  TryCatch(ProductLineController.productLineList)
  // ProductLineController.productLineList
);

productLineRoute.post(
  "/",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.createProductLine)
  // ProductLineController.createProductLine
);
productLineRoute.put(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.updateProductLine)
  // ProductLineController.updateProductLine
);
productLineRoute.delete(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(ProductLineController.deleteProductLine)
  // ProductLineController.deleteProductLine
);

module.exports = productLineRoute;
