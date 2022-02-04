const Organization = require("../../db/models/Organization");
const Transaction = require("../../db/models/Transaction");
// const { verifyJWT } = require("../../middleware/jwt");
const router = require("express").Router();

// /api/organization/transaction/:id

// to find out all the transaction
router.get("/:id", async (req, res) => {
  try {
    const org_id = req.params.id;

    if (!(await Organization.findById(org_id))) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    const transactions = await Transaction.find({ organization: org_id });

    return res.status(200).json({
      message: "Organization Transactions fetched successfully!!",
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
