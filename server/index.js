const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const appRoute = require("./routes/router");


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.URL_CONNECT_MD, () => {
  console.log("connect to mongoose db");
});

app.use("/api", appRoute);

app.get("/cookie", (req, res) => {
  res.send(req.cookies["accessToken"]);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
