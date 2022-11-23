const mongoose = require("mongoose");
const ProductLine = require("./ProductLineModel");
const User = require("./UserModel");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  productLine: {
    type: Schema.Types.ObjectId,
    ref: 'ProductLine',
  },
  identifier: {
    type: String,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model("Product", productSchema);
