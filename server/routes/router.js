const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const productlineRoute = require("./productline");

const appRoute = express()

appRoute.use('/auth', authRouter)
appRoute.use('/auth', userRouter)
appRoute.use('/productline', productlineRoute)

module.exports = appRoute