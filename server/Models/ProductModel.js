const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productLine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductLine',
    require: true
  },
  identifier: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model("Product", productSchema);
