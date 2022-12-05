const factoryRoute = require('express').Router()
const factoryController = require('../Controllers/FactoryController')

factoryRoute.get("/quantityInStock", factoryController.quantityInStock);

module.exports = factoryRoute;