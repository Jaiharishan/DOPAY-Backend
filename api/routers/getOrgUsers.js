const Organization = require("../../db/models/Organization");
const User = require("../../db/models/User");
const router = require("express").Router();

router.get("/:id/members", async (req, res) => {
  try {
    const org_id = req.params.id;
    // console.log(org_id);

    const organization = await Organization.findById(org_id);

    if (!organization)
      return res.status(404).json({ message: "Organization not found!" });

    const members = await (
      await User.find()
    ).filter((member) => {
      if (member.organizations.includes(org_id)) return member;
    });

    // console.log(members);
    return res.status(200).json({
      message: "Users of the organizations fetched successfully!!",
      members,
    });
    // Promise.all()
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Server Error, Try again!!",
    });
  }
});

module.exports = router;
