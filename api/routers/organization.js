const router = require("express").Router();
const Organization = require("../../db/models/Organization");
const User = require("../../db/models/User");
const { verifyJWT } = require("../../middleware/jwt");
const upload = require("../../middleware/upload");

// create organization

// api/organization/create

router.post("/create", verifyJWT, upload.single("file"), async (req, res) => {
  try {
    const { name, description, email, visibility, tags, cards } = req.body;

    const user_id = req.jwt_payload._id;

    // const profilePicData = req.file;
    if (req.file === undefined) return res.send("you must select a file.");

    console.log("req file is", req.file);

    const profilePic = `http://localhost:8080/api/file/${req.file.filename}`;

    if (!name || !description || !email || !visibility) {
      res.status(400).json({
        message: "Fill all the required fields!",
      });
    }

    if (await Organization.findOne({ name: name })) {
      return res.status(400).json({
        message: "Organization already exists!",
      });
    }

    if (await Organization.findOne({ email: email })) {
      return res.status(400).json({
        message: "Email is already in use!",
      });
    }

    // if (tags) {
    //   tags = tags.split(" ");
    // }

    // if (cards) {
    //   cards = cards.split(" ");
    // }

    const newOrganization = new Organization({
      name: name,
      description: description,
      email: email,
      head: [user_id],
      profilePic: profilePic,
      visibility: visibility,
    });

    await newOrganization.save();

    return res.status(200).json({
      message: "Organization created successfully!!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// get an organization
router.get("/:id", async (req, res) => {
  try {
    const org_id = req.params.id;

    const organization = await Organization.findById(org_id);

    if (!organization) {
      return res.status(404).json({ message: "Organization does not exist!" });
    }

    return res.status(200).json({
      message: "Organization fetched successfully!!",
      organization,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// /api/organization/edit/:organization_id

router.put("/edit/:id", verifyJWT, upload.single("file"), async (req, res) => {
  try {
    const { description, email, visibility, tags, cards } = req.body;
    const organization_id = req.params.id;

    const user_id = req.jwt_payload._id;

    const organization = await Organization.findById(organization_id);

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found!",
      });
    }

    if (!organization.heads.includes(user_id)) {
      return res.status(400).json({
        message: "You are not the head!",
      });
    }

    let profilePic;
    if (req.file === undefined) {
      profilePic = organization.profilePic;
    } else {
      profilePic = `http://localhost:8080/api/file/${req.file.filename}`;
    }

    await Organization.findByIdAndUpdate(organization_id, {
      description: description,
      email: email,
      visibility: visibility,
      profilePic: profilePic,
      tags: tags,
      cards: cards,
    });

    return res.status(200).json({
      message: "Organization details updated successfully!!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// api/organization/delete/:organization_id

router.delete("/delete/:id", verifyJWT, async (req, res) => {
  try {
    const organization_id = req.params.id;
    const user_id = req.jwt_payload._id;

    const organization = await Organization.findById(organization_id);

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found!",
      });
    }

    if (!organization.heads.includes(user_id)) {
      return res.status(400).json({
        message: "You are not the head!",
      });
    }

    await Organization.findByIdAndDelete(organization_id);

    return res.status(200).json({
      message: "Organization deleted successfully!!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});
module.exports = router;
