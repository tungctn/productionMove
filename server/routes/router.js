const express = require("express");
const appRoute = express()
const authRoute = require("./AuthRoute");
const userRoute = require("./UserRoute");
const productLineRoute = require("./ProductLineRoute");
const productRoute = require("./ProductRoute");
const requestRoute = require("./RequestRoute");

appRoute.use('/auth', authRoute);
appRoute.use('/user', userRoute);
appRoute.use('/productline', productLineRoute);
appRoute.use('/product',productRoute);
appRoute.use('/request', requestRoute);

module.exports = appRoute;