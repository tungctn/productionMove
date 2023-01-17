// const mongoose = require("mongoose");
// mongoose.set('strictQuery', false)

const Mongoose = require("./Mongoose");
const mongoose = new Mongoose();
const productSchema = new mongoose.Schema(
  {
    productLine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductLine",
      require: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    factory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Number,
      enums: [
        0, // mới sản xuất 1
        1, // đưa về đại lý 1
        2, // đã bán 1
        3, // lỗi cần bảo hành 1
        4, // đang bảo hành 1
        5, // đã bảo hành xong 1
        6, // đã trả lại cho khách hàng 1
        7, // lỗi, cần trả về cơ sở sản xuất 1
        8, // lỗi, đã đưa về cơ sở sản xuất 1
        9, // lỗi cần triệu hồi
        10, // hết thời gian bảo hành
        11, // trả lại cơ sở sản xuất do lâu không bán được 1
      ],
      default: 0,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    customer: {
      name: String,
      address: String,
      email: String,
      phone: String,
      soldDate: Date,
    },
    deadTime: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
