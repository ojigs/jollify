const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongDetails,
  likeSong,
  getAnySong,
  getTopSongs,
} = require("../controllers/songController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllSongs);
router.get("/any", getAnySong);
router.get("/top", getTopSongs);
router.get("/:songId", getSongDetails);
router.post("/:songId/like", verifyToken, likeSong);

module.exports = router;
