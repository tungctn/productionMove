const mongoose = require("mongoose");
const Request = require("./RequestModel");
const Schema = mongoose.Schema;
const userSchema = new Schema(
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
    admin: {
      type: Boolean,
      default: false,
    },
    requestList: [{ type: Schema.Types.ObjectId, ref: 'Request'}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
