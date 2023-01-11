const mongoose = require("mongoose");
const Request = require("./RequestModel");
var Schema = mongoose.Schema;
mongoose.set("strictQuery", false);
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 28,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
      unique: true,
    },
    img: {
      type: String,
      default: "https://i.imgur.com/8Km9tLL.png",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      default: "123456",
    },
    role: {
      type: Number,
      enums: [
        1, // admin
        2, // factory,
        3, // store,
        4, // warrantyCenter,
      ],
    },
    requestList: [{ type: Schema.Types.ObjectId, ref: "Request", default: [] }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
