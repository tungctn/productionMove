const MiddlewareAuth = require("../Middleware/isLogged");
const UserController = require("../Controllers/UserController");
const verifyUser = require("../Middleware/verifyUser");
const userRouter = require("express").Router();

userRouter.get(
  "/profile",
  MiddlewareAuth.verifyToken,
  UserController.getCurrentUser
);

userRouter.get("/", UserController.getListUser);

userRouter.get("/:id", verifyUser.verifyAdmin, UserController.getUser);

userRouter.post("/", verifyUser.verifyAdmin, UserController.createUser);

userRouter.put("/:id", verifyUser.verifyAdmin, UserController.updateUser);

userRouter.delete("/:id", verifyUser.verifyAdmin, UserController.deleteUser);

module.exports = userRouter;
