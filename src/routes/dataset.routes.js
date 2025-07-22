const auth = require("../middlewares/auth.middleware");
const multer = require("multer");
const base64Storage = require("../config/base64.multer");

const router = require("express").Router();
const upload = multer({ storage: base64Storage() });

router.post(
  "/datasets/upload",
  auth,
  upload.single("file"),
  async (req, res, next) => {
    // console.log(`req.file ${req.file}`);
    console.log(`req.body ${req.body.metadata}`);
    res.json({ msg: "okay" });
  }
);

module.exports = router;
