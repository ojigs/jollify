const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  editUserDetails,
  uploadImage,
  getCurrentUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.patch("/edit", verifyToken, editUserDetails);
router.get("/currentUser", verifyToken, getCurrentUser);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.get("/:userId", getUserDetails);

module.exports = router;
