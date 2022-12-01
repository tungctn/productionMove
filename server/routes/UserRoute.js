const MiddlewareAuth = require("../Middleware/isLogged");
const UserController = require("../Controllers/UserController");

const userRouter = require("express").Router();

userRouter.get(
  "/profile",
  MiddlewareAuth.verifyToken,
  UserController.getCurrentUser
);

userRouter.post(
  "/create",
  MiddlewareAuth.verifyToken,
  UserController.createUser
);

module.exports = userRouter;
