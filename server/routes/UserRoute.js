const MiddlewareAuth = require("../Middleware/isLogged");
const UserController = require("../Controllers/UserController");

const userRouter = require("express").Router();

userRouter.get(
  "/profile",
  MiddlewareAuth.verifyToken,
  UserController.getCurrentUser
);

userRouter.get("/", UserController.getListUser);

userRouter.get("/:id", UserController.getUser);

userRouter.post("/", UserController.createUser);

userRouter.put("/:id", UserController.updateUser);

userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
