const AuthController = require("../Controllers/AuthController");
const MiddlewareController = require("../Controllers/MiddlewareController");

const authRouter = require("express").Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);
authRouter.post("/logout",MiddlewareController.verifyToken, AuthController.userLogout);

module.exports = authRouter;
