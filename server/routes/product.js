const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const middleware = require('../Middleware/verifyUser')

productRoute.post(
  "/",
  middleware.verifyFactory,
  productController.productCreate
);

productRoute.get('/')

module.exports = productRoute;
