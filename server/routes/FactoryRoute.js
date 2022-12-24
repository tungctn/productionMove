const factoryRoute = require("express").Router();
const factoryController = require("../Controllers/FactoryController");
const TryCatch = require("../utils/TryCatch");

factoryRoute.post(
  "/quantityInStock",
  TryCatch(factoryController.quantityInStock)
);

module.exports = factoryRoute;
