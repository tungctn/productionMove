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
  verifyUser.verifyAdmin,
  TryCatch(UserController.getUser)
);

userRouter.post(
  "/",
  verifyUser.verifyAdmin,
  TryCatch(UserController.createUser)
);

userRouter.put(
  "/:id",
  // verifyUser.verifyAdmin,
  MiddlewareAuth.verifyToken,
  TryCatch(UserController.updateUser)
);

userRouter.delete(
  "/:id",
  verifyUser.verifyAdmin,
  TryCatch(UserController.deleteUser)
);

userRouter.post(
  "/search",
  verifyUser.verifyAdmin,
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

module.exports = userRouter;
