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
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(productController.getProductByUser)
);

productRoute.get(
  "/:id",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(productController.getProduct)
);

productRoute.post(
  "/",
  verifyUser.verifyUser([2]),
  TryCatch(productController.createProduct)
);

productRoute.put(
  "/:id",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(productController.updateProduct)
);

productRoute.delete(
  "/:id",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(productController.deleteProduct)
);

productRoute.post(
  "/search",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(productController.searchProduct)
)

module.exports = productRoute;
