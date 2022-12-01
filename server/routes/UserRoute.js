const MiddlewareAuth = require("../Middleware/isLogged");
const UserController = require("../Controllers/UserController");

const userRouter = require("express").Router();

userRouter.get(
  "/",
  UserController.getUser
);
userRouter.post(
  "/", 
  UserController.createUser
);

userRouter.post(
  "/:id",
  UserController.updateUser
);

module.exports = userRouter;
