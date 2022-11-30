const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const appRoute = require("./routes/Router");

const app = express();
const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000", "http://127.0.0.1"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.URL_CONNECT_MD, () => {
  console.log("connect to mongoose db");
});

app.use("/api", appRoute);

app.get("/", (req, res) => {
  res.send("jdsds");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
