const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const appRoute = require("./routes/router");
dotenv.config();

const app = express();
const corsOptions = {
  //To allow requests from client
  origin: [
    process.env.CLIENT_URL,
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect(process.env.URL_CONNECT_MD, () => {
  console.log("connect to mongoose db");
});

app.use("/api", appRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(PORT);
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
