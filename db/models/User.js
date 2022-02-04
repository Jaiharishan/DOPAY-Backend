const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    profilePic: String,
    description: String,
    cards: [String],
    organizations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
