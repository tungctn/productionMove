const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const app = express();

const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "product",
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.URL_CONNECT_MD, () => {
  console.log("connect to mongoose db");
});

app.use("/api", authRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", (req, res) => {
  const data = req.body;
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  const { email, password } = data;
  const values = [email, password];
  const connection = mysql.createConnection(credentials);
  connection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    values,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          res
            .status(200)
            .send({ success: true, data: result[0], token: token });
        } else {
          res.status(400).send({ success: false, message: "no user" });
        }
      }
    }
  );
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
