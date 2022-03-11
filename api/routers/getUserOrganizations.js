const router = require("express").Router();
const { verifyJWT } = require("../../middleware/jwt");
const User = require("../../db/models/User");
const Organization = require("../../db/models/Organization");

// /api/self/organizations
router.get("/organizations", verifyJWT, async (req, res) => {
  try {
    const user_id = req.jwt_payload._id;

    const user = await User.findById(user_id);

    if (!user) return res.status(404).json({ message: "User not found!" });

    // let organizations = [];

    // queries if the user is a member in that organization or head in it
    const userOrganizations = await Organization.find({
      $or: [{ heads: { $in: [user_id] } }, { members: { $in: [user_id] } }],
    });

    return res.status(200).json({
      message: "User organizations fetched successfully",
      organizations: userOrganizations,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

module.exports = router;
