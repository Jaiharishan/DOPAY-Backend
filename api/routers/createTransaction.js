const Payment = require("../../db/models/Payment");
const Transaction = require("../../db/models/Transaction");
const { verifyJWT } = require("../../middleware/jwt");

const router = require("express").Router();

// /api/transaction/:payment_id/create
router.post("/:payment_id/create", verifyJWT, async (req, res) => {
  try {
    const { description } = req.body;
    const payment_id = req.params.payment_id;
    const user_id = req.jwt_payload._id;

    if (!description) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }
    const payment = await Payment.findById(payment_id);
    // if payment not found
    if (!(await payment)) {
      return res.status(404).json({
        message: "Payment details not found!",
      });
    }

    const transaction = new Transaction({
      amount: payment.amount,
      description: description,
      paidBy: user_id,
      payment: payment_id,
      organization: payment.organization,
    });

    await transaction.save();

    await Payment.findByIdAndUpdate(payment_id, {
      $addToSet: { paidBy: user_id },
    });
    return res.status(200).json({
      message: "Transaction created successfully!!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error. Try again later!!",
    });
  }
});

module.exports = router;
