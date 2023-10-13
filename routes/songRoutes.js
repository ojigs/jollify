const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongDetails,
  likeSong,
  addComment,
  getAnySong,
  getTopSongs,
} = require("../controllers/songController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllSongs);
router.get("/any", getAnySong);
router.get("/top", getTopSongs);
router.post("/:songId/like", verifyToken, likeSong);
router.post("/:songId/comment", verifyToken, addComment);
router.get("/:songId", getSongDetails);

module.exports = router;
