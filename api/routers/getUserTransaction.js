const Transaction = require("../../db/models/Transaction");
const { verifyJWT } = require("../../middleware/jwt");

const router = require("express").Router();

// /api/transaction/history
router.get("/history", verifyJWT, async (req, res) => {
  try {
    const user_id = req.jwt_payload._id;

    const transactions = await Transaction.find({ paidBy: user_id })
      .populate({
        path: "payment",
        select: "name",
      })
      .populate({
        path: "organization",
        select: "name",
      });

    return res.status(200).json({
      message: "Transaction history fetched successfully!!",
      transactions,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

module.exports = router;
