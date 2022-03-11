const Payment = require("../../db/models/Payment");

const router = require("express").Router();

// /api/payment/
router.get("/", async (req, res) => {
  try {
    const payments_id = await Payment.find({}).select("_id");

    if (!payments_id) {
      return res.status(404).json({
        message: "All organizations are not found!",
      });
    }

    return res.status(200).json({
      message: "All Organization Ids fetched successfully",
      payments_id: payments_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

module.exports = router;
