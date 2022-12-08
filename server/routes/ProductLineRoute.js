const productLineRoute = require("express").Router();
const ProductLineController = require("../Controllers/ProductLineController");
const verifyUser = require("../Middleware/verifyUser");

productLineRoute.get("/:id", ProductLineController.getProductLine);
productLineRoute.get(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  ProductLineController.productLineList
);

productLineRoute.post(
  "/",
  verifyUser.verifyAdmin,
  ProductLineController.createProductLine
);
productLineRoute.put(
  "/:id",
  verifyUser.verifyAdmin,
  ProductLineController.updateProductLine
);
productLineRoute.delete(
  "/:id",
  verifyUser.verifyAdmin,
  ProductLineController.deleteProductLine
);

module.exports = productLineRoute;
