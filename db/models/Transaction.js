const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
    amount: Number,
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", paymentSchema);
