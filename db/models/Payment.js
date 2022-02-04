const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    amount: Number,
    deadline: Date,
    paidBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
