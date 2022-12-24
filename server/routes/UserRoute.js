const MiddlewareAuth = require("../Middleware/isLogged");
const UserController = require("../Controllers/UserController");
const verifyUser = require("../Middleware/verifyUser");
const TryCatch = require("../utils/TryCatch");
const userRouter = require("express").Router();

userRouter.get(
  "/profile",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.getCurrentUser)
  // UserController.getCurrentUser
);

userRouter.get(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.getListUser)
  //  UserController.getListUser
);

userRouter.get(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(UserController.getUser)
  //  UserController.getUser
);

userRouter.post(
  "/",
  verifyUser.verifyAdmin,
  TryCatch(UserController.createUser)
  //  UserController.createUser
);

userRouter.put(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(UserController.updateUser)
  // UserController.updateUser
);

userRouter.delete(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(UserController.deleteUser)
  // UserController.deleteUser
);

module.exports = userRouter;
