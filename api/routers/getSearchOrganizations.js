const router = require("express").Router();
const Organization = require("../../db/models/Organization");

// /api/organization/search/:name
router.get("/search/:name", async (req, res) => {
  try {
    const org_name = req.params.name;
    const org_name_regex = new RegExp(org_name, "i");

    const organizations = await Organization.find({ name: org_name_regex });

    if (!organizations) {
      return res.status(404).json({
        message: "Organizations not found!",
      });
    }

    return res.status(200).json({
      message: "Organizations found for your search result!",
      organizations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error. Try again later!",
    });
  }
});

module.exports = router;
