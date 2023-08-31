const express = require("express");
const router = express.Router();
const { addComment, getComments } = require("../controllers/commentController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/:songId", verifyToken, addComment);
router.get("/:songId", getComments);

module.exports = router;
