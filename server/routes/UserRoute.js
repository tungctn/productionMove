const MiddlewareAuth = require("../Middleware/isLogged");
const UserController = require("../Controllers/UserController");
const verifyUser = require("../Middleware/verifyUser");
const TryCatch = require("../utils/TryCatch");
const userRouter = require("express").Router();

userRouter.get(
  "/profile",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.getCurrentUser)
);

userRouter.get(
  "/",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.getListUser)
);

userRouter.get(
  "/:id",
  verifyUser.verifyUser([1]),
  TryCatch(UserController.getUser)
);

userRouter.post(
  "/",
  verifyUser.verifyUser([1]),
  TryCatch(UserController.createUser)
);

userRouter.put(
  "/:id",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.updateUser)
);

userRouter.delete(
  "/:id",
  verifyUser.verifyUser([1]),
  TryCatch(UserController.deleteUser)
);

userRouter.post(
  "/search",
  verifyUser.verifyUser([1]),
  TryCatch(UserController.searchUser)
);

userRouter.post(
  "/changePassword",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.changePassword)
);

userRouter.post(
  "/checkPassword",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.checkPassword)
);

userRouter.post(
  "/checkEmail",
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.checkEmail)
);

module.exports = userRouter;
