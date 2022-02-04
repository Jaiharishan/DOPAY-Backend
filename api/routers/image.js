const upload = require("../../middleware/upload");
const express = require("express");
const router = express.Router();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const connection = require("../../db/db");
let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

// media routes

//  this get route is for hosting the image in the server so for all images which has been uploaded make sure this exists
router.get("/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);

    // if (!file) {
    //   return res.status(404).json({
    //     message: "Image does not exist",
    //   });
    // }
    // const imgUrl = `http://localhost:8080/api/file/${req.params.filename}`;
    // res.status(200).json({
    //   file,
    //   imgUrl,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// actual get req handling
router.get("/get/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const imgUrl = `http://localhost:8080/api/file/${filename}`;
    res.status(200).json({
      imgUrl: imgUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

// delete
router.delete("/:filename", async (req, res) => {
  try {
    const image = await gfs.files.deleteOne({ filename: req.params.filename });

    if (!image) {
      res.status(404).json({
        message: "Image not found!",
      });
    }

    res.status(200).json({
      message: "Image deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/api/file/${req.file.filename}`;
    return res.status(200).json({
      message: "Image uploaded successfully",
      imgUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error, Try again later!!",
    });
  }
});

module.exports = router;
