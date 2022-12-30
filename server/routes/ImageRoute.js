const imageRoute = require("express").Router();
const ImageController = require("../Controllers/ImageController");
const TryCatch = require("../utils/TryCatch");
const MiddlewareAuth = require("../Middleware/isLogged");

imageRoute.post(
  "/upload",
  MiddlewareAuth.verifyToken,
  TryCatch(ImageController.uploadImage)
);

module.exports = imageRoute;
