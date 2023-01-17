// const mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// mongoose.set("strictQuery", false);
const Mongoose = require("./Mongoose");
const mongoose = new Mongoose();

const requestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
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
        0, // yêu cầu nhập sản phẩm
        1, // yêu cầu bảo hành
        2, // yêu cầu nhận sản phẩm đã bảo hành xong
        3, // yêu cầu trả lại sản phẩm do không bảo hành được
        4, // yêu cầu trả lại cơ sở sản xuất do lâu không bán được
        5, // yêu cầu bàn giao sản phẩm mới cho khách hàng
        6, // yêu cầu triệu hồi sản phẩm
      ],
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
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
    isRead: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Request", requestSchema);
