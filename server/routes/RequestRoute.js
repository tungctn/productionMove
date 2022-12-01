const requestRoute = require("express").Router();
const requestController = require("../Controllers/RequestController");

requestRoute.get("/", requestController.getRequest);

requestRoute.post('/', requestController.createRequest);

requestRoute.post('/:id', requestController.updateRequest);
module.exports = requestRoute;
