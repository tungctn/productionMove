const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged");
const TryCatch = require("../utils/TryCatch");

requestRoute.get(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.getRequest)
);
requestRoute.get(
  "/",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.getAllRequest)
);
requestRoute.post(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(requestController.createRequest)
);
requestRoute.put(
  "/handleImportRequest",
  verifyUser.verifyFactory,
  TryCatch(requestController.handleImportRequest)
);

requestRoute.put(
  "/:id",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.updateRequest)
);

requestRoute.post(
  "/search",
  verifyUser.verifyFactory_WarrantyCenter_Store,
  TryCatch(requestController.searchRequest)
);

module.exports = requestRoute;
