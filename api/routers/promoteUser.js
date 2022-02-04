const Organization = require("../../db/models/Organization");
const User = require("../../db/models/User");
const { verifyJWT } = require("../../middleware/jwt");

const router = require("express").Router();

// adding a new member to the organization

// /api/organization/promoteUser/:org_id/:member_id

router.post("/:org_id/:member_id", verifyJWT, async (req, res) => {
  try {
    const user_id = req.jwt_payload._id;
    const member_id = req.params.member_id;
    const organization_id = req.params.org_id;

    const organization = await Organization.findById(organization_id);

    // checks if the member exists
    if (!(await User.findById(member_id))) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // checks if the organization exitst
    if (!organization) {
      return res.status(404).json({
        message: "Organization not found!",
      });
    }

    // checks if the user is one of the heads of the organization
    if (!organization.heads.includes(user_id)) {
      return res.status(400).json({
        message: "You are not the head!",
      });
    }

    //  checks if the member we trying to promote is already a head
    if (organization.heads.includes(member_id)) {
      return res.status(400).json({
        message: "The member you are trying to promote is already a head!",
      });
    }

    //  checks if the member we trying to promote is in the organization
    if (!organization.members.includes(member_id)) {
      return res.status(400).json({
        message: "The member you are trying to promote is already a head!",
      });
    }

    await Organization.findByIdAndUpdate(organization_id, {
      $pull: { members: member_id },
      $addToSet: { heads: member_id },
    });

    return res.status(200).json({
      message: "Member promoted to head successfully!!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

module.exports = router;
