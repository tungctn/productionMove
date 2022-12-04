const productRoute = require("express").Router();
const productController = require("../Controllers/ProductController");
const verifyUser = require("../Middleware/verifyUser");

productRoute.post("/", verifyUser.verifyAdmin, productController.createProduct);

productRoute.get("/", productController.productList);

productRoute.put("/:id", productController.updateProduct);

module.exports = productRoute;
