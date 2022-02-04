const User = require("../../db/models/User");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const user_id = req.params.id;

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
module.exports = router;
