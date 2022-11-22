const authRouter = require("./auth");
const userRouter = require("./user");
const express = require("express");

const appRoute = express()

appRoute.use('/auth', authRouter)
appRoute.use('/auth', userRouter)

module.exports = appRoute