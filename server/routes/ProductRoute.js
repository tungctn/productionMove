const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");

productRoute.post(
  "/",
  verifyUser.verifyFactory,
  productController.createProduct
);

productRoute.get("/");

productRoute.put("/:id", productController.updateProduct);

module.exports = productRoute;
