const mongoose = require("mongoose");
const Request = require("./RequestModel");
var Schema = mongoose.Schema;

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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: Number,
      enums: [
        1, // admin
        2, // factory,
<<<<<<< HEAD
        3, // dealer,
        4, // maintenance,
=======
        3, // store,
        4, // warrantyCenter,
>>>>>>> 261844288ca3a55b5d06a10b32b7e90e93148388
      ],
    },
    requestList: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
