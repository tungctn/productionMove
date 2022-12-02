const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");


requestRoute.post('/', requestController.createRequest);

module.exports = requestRoute;
