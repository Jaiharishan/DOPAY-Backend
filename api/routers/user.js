const User = require("../../db/models/User");

const router = require("express").Router();

const upload = require("../../middleware/upload");

// /api/self
router.get("/", async (req, res) => {
  try {
    const user_id = req.jwt_payload._id;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// /api/self/edit
router.put("/edit", upload.single("file"), async (req, res) => {
  try {
    const { description, email } = req.body;

    const user_id = req.jwt_payload._id;
    // console.log(req);

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    let profilePic;
    if (req.file === undefined) {
      profilePic = user.profilePic;
    } else {
      profilePic = `http://localhost:8080/api/file/${req.file.filename}`;
    }

    // console.log("req file is", req.file);

    await User.findByIdAndUpdate(user_id, {
      description: description,
      email: email,
      // cards: cards,
      profilePic: profilePic,
    });

    return res.status(200).json({
      message: "User updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// /api/self/delete
router.delete("/delete", async (req, res) => {
  try {
    const user_id = req.jwt_payload._id;

    if (!(await User.findById(user_id))) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    await User.findByIdAndDelete(user_id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

module.exports = router;
