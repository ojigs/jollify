const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongDetails,
  likeSong,
  getAnySong,
} = require("../controllers/songController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllSongs);
router.get("/any", getAnySong);
router.get("/:songId", getSongDetails);
router.post("/:songId/like", verifyToken, likeSong);

module.exports = router;
