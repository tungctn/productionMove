const mongoose = require("mongoose");
var User = require("./UserModel");
var Schema = mongoose.Schema;
const requestSchema = new mongoose.Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: Number,
      enums: [
        1, //'requested',
        2, //'pending',
        3, //'accept',
        4, //'reject',
      ],
      required: true,
    },
    type: {
      type: Number,
      enums: [
        0, // yêu cầu nhập sản phẩm 1
        1, // yêu cầu bảo hành 1
        2, // yêu cầu nhận sản phẩm đã bảo hành xong 1
        3, // yêu cầu trả lại sản phẩm do không bảo hành được
        4, // yêu cầu trả lại cơ sở sản xuất do lâu không bán được 1
      ],
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    feedback: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    amount: Number,
    productLine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductLine",
      require: true,
    },
    refRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request", 
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Request", requestSchema);
