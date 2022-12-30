const AuthController = require("../Controllers/AuthController");
const MiddlewareAuth = require("../Middleware/isLogged");
const TryCatch = require("../utils/TryCatch");

const authRouter = require("express").Router();

authRouter.post("/login", TryCatch(AuthController.loginUser));
authRouter.post(
  "/logout",
  MiddlewareAuth.verifyToken,
  TryCatch(AuthController.userLogout)
);

module.exports = authRouter;
