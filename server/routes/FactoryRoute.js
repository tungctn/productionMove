
const factoryRoute = require("express").Router();
const factoryController = require("../Controllers/FactoryController");

factoryRoute.post("/quantityInStock", factoryController.quantityInStock);

module.exports = factoryRoute;
