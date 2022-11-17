const MiddlewareController = require('../Controllers/MiddlewareController')
const UserController = require('../Controllers/UserController')

const userRouter = require('express').Router()

userRouter.get('/user',MiddlewareController.verifyToken, UserController.getAllUser)
userRouter.get('/profile',MiddlewareController.verifyToken, UserController.getCurrentUser)

module.exports = userRouter