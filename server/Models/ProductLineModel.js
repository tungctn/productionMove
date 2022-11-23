const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productLineSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  length: {
    type: Number,
    require: true,
  },
  width: {
    type: Number,
    require: true,
  },
  height: {
    type: Number,
    require: true,
  },
  wheelAxleDistance: {
    type: Number,
    require: true,
  },
  saddleHeight: {
    type: Number,
    require: true,
  },
  groundClearance: {
    type: Number,
    require: true,
  },
  petrolTankCapacity: {
    type: Number,
    require: true,
  },
  fuelConsumption: {
    type: Number,
    require: true,
  },
  displacementVolume: {
    type: Number,
    require: true,
  },
  engineType: {
    type: String,
    require: true,
  }
});
module.exports = mongoose.model("ProductLine", productLineSchema);