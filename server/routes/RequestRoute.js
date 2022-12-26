const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged");
const TryCatch = require("../utils/TryCatch");

requestRoute.get(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.getRequest)
  // requestController.getRequest
);
requestRoute.get(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.getAllRequest)
  // requestController.getAllRequest
);
requestRoute.post(
  "/",
  // verifyUser.verifyFactory_WarrantyCenter_Store,
  MiddlewareAuth.verifyToken, 
  TryCatch(requestController.createRequest)
  // requestController.createRequest
);
requestRoute.put(
  "/handleImportRequest",
  verifyUser.verifyFactory,
  TryCatch(requestController.handleImportRequest)
  // requestController.handleImportRequest
);

requestRoute.put(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.updateRequest)
  // requestController.updateRequest
);

module.exports = requestRoute;
