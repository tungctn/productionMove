const AuthController = require("../Controllers/AuthController");
const MiddlewareAuth = require("../Middleware/Auth");

const authRouter = require("express").Router();

authRouter.post("/login", AuthController.loginUser);
authRouter.post("/logout",MiddlewareAuth.verifyToken, AuthController.userLogout);

module.exports = authRouter;
