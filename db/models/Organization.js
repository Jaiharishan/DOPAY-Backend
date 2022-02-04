const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    description: String,
    profilePic: String,
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    cards: [String],
    tags: [String],
    heads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
