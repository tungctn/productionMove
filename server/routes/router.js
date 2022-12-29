const express = require("express");
const appRoute = express();
const authRoute = require("./AuthRoute");
const userRoute = require("./UserRoute");
const productLineRoute = require("./ProductLineRoute");
const productRoute = require("./ProductRoute");
const requestRoute = require("./RequestRoute");
const factoryRoute = require("./FactoryRoute");
const imageRoute = require("./ImageRoute");

appRoute.use("/auth", authRoute);
appRoute.use("/user", userRoute);
appRoute.use("/productline", productLineRoute);
appRoute.use("/product", productRoute);
appRoute.use("/request", requestRoute);
appRoute.use("/factory", factoryRoute);
appRoute.use("/image", imageRoute)


module.exports = appRoute;
