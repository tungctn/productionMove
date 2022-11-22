const mongoose = require("mongoose");
const User = require("./UserModel");
const requestSchema = new mongoose.Schema(
  {
    requester: { 
        type: Schema.Types.ObjectId, 
        required: true,
        ref: User
    },
    recipient: { 
        type: Schema.Types.ObjectId,
        required: true, 
        ref: User 
    },
    status: {
      type: Number,
      enums: [
        0, 
        1, //'requested',
        2, //'pending',
        3, //'accept',
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Request', requestSchema);
