const AuthController = require("../Controllers/AuthController");
const MiddlewareAuth = require("../Middleware/isLogged");

const authRouter = require("express").Router();

authRouter.post("/login", AuthController.loginUser);
authRouter.post("/logout",MiddlewareAuth.verifyToken, AuthController.userLogout);
authRouter.post('/token',MiddlewareAuth.verifyToken)

module.exports = authRouter;
