const Organization = require("../../db/models/Organization");

const router = require("express").Router();

// /api/organization/
router.get("/", async (req, res) => {
  try {
    const orgs_id = await Organization.find({}).select("_id");

    if (!orgs_id) {
      return res.status(404).json({
        message: "All organizations are not found!",
      });
    }

    return res.status(200).json({
      message: "All Organization Ids fetched successfully",
      orgs_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

module.exports = router;
