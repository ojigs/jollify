const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  editUserDetails,
  uploadImage,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.get("/:userId", getUserDetails);
router.patch("/edit", verifyToken, editUserDetails);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);

module.exports = router;
