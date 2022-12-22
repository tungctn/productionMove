const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged");

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
requestRoute.put(
  "/handleImportRequest",
  verifyUser.verifyFactory,
  requestController.handleImportRequest
);

requestRoute.put(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  requestController.updateRequest
);

module.exports = requestRoute;
