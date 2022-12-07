const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");
const verifyUser = require("../Middleware/verifyUser");

// requestRoute.post("/", requestController.createRequest);
requestRoute.get(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  requestController.getRequest
);
requestRoute.get(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  requestController.getAllRequest
);
requestRoute.post(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  requestController.createRequest
);

module.exports = requestRoute;
