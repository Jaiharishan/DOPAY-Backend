const Organization = require("../../db/models/Organization");
const Payment = require("../../db/models/Payment");
const { verifyJWT } = require("../../middleware/jwt");

const router = require("express").Router();

// /api/organization/transactions/pending/:id
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const org_id = req.params.id;
    const user_id = req.jwt_payload.id;

    // check if org exists
    if (!(await Organization.findById(org_id))) {
      return res.status(404).json({
        message: "Organization not found!",
      });
    }

    // filters by organization id, user id and deadline
    const pendingPayments = await Payment.find({
      organization: org_id,
      paidBy: { $nin: user_id },
      deadline: { $gt: Date.now() },
    });

    return res.status(200).json({
      message: "Pending payments fetched successfully!!",
      pendingPayments,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error. Try again later!!",
    });
  }
});
module.exports = router;
