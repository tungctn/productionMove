// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
const Mongoose = require("./Mongoose");
const mongoose = new Mongoose();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 28,
      index: {
        sparse: true,
      },
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
      index: {
        unique: true,
      },
    },
    img: {
      type: String,
      default: "https://i.imgur.com/8Km9tLL.png",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      default: "123456",
    },
    role: {
      type: Number,
      enums: [
        1, // admin
        2, // factory,
        3, // store,
        4, // warrantyCenter,
      ],
    },
    requestList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

userSchema.post("findOneAndDelete", async (doc, next) => {
  if (doc) {
    const relatedRequestIds = await mongoose.model("Request").aggregate([
      {
        $match: {
          $or: [{ requester: doc._id }, { recipient: doc._id }],
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    await mongoose.model("Product").deleteMany({
      $or: [{ location: doc._id }, { factory: doc._id }, { store: doc._id }],
    });

    await mongoose
      .model("Request")
      .deleteMany({ $or: [{ requester: doc._id }, { recipient: doc._id }] });

    if (relatedRequestIds.length > 0) {
      await mongoose
        .model("User")
        .updateMany(
          { requestList: { $exists: true, $ne: [] } },
          { $pull: { requestList: { $in: relatedRequestIds } } },
          { multi: true }
        );
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
