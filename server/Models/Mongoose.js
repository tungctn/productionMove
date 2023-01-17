const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

class Mongoose {
  constructor() {
    this.mongoose = mongoose;
    Object.assign(this, mongoose);
  }
}

module.exports = Mongoose;
