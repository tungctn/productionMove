const mongoose = require("mongoose");

class Mongoose {
  constructor() {
    this.mongoose = mongoose;
    mongoose.set("strictQuery", false);
    Object.assign(this, mongoose);
  }
}

module.exports = Mongoose;
