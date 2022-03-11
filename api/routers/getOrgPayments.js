const Organization = require("../../db/models/Organization");
const Payment = require("../../db/models/Payment");
const router = require("express").Router();

// /api/organization/payments
router.get("/:id/payments", async (req, res) => {
  try {
    const org_id = req.params.id;

    const organization = await Organization.findById(org_id);

    if (!organization)
      return res.status(404).json({
        message: "Organization not found!",
      });

    const activeOrgPayments = await Payment.find({
      organization: org_id,
      deadline: { $gt: Date.now() },
    });
    const pastOrgPayments = await Payment.find({
      organization: org_id,
      deadline: { $lt: Date.now() },
    });

    return res.status(200).json({
      message: "All payments related to the organization got successfully!!",
      activeOrgPayments,
      pastOrgPayments,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Server Error, Try again!!",
    });
  }
});

module.exports = router;
