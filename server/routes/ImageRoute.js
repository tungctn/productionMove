const imageRoute = require("express").Router();
const ImageController = require("../Controllers/ImageController");
const TryCatch = require("../utils/TryCatch");

imageRoute.post(
  "/upload",
  //   MiddlewareAuth.verifyToken,
  TryCatch(ImageController.uploadImage)
);

module.exports = imageRoute;
