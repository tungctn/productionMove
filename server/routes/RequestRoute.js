const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");
const verifyUser = require("../Middleware/verifyUser");
const MiddlewareAuth = require("../Middleware/isLogged");
const TryCatch = require("../utils/TryCatch");

requestRoute.get(
  "/:id",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(requestController.getRequest)
);
requestRoute.get(
  "/",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(requestController.getAllRequest)
);
requestRoute.post(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(requestController.createRequest)
);
requestRoute.put(
  "/handleImportRequest",
  verifyUser.verifyUser([2]),
  TryCatch(requestController.handleImportRequest)
);

requestRoute.put(
  "/:id",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(requestController.updateRequest)
);

requestRoute.post(
  "/search",
  verifyUser.verifyUser([2, 3, 4]),
  TryCatch(requestController.searchRequest)
);

module.exports = requestRoute;
