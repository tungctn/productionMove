const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const productlineRoute = require("./productline");
const productRoute = require("./product");

const appRoute = express()

appRoute.use('/auth', authRouter)
appRoute.use('/auth', userRouter)
appRoute.use('/productline', productlineRoute)
appRoute.use('/product',productRoute)

module.exports = appRoute