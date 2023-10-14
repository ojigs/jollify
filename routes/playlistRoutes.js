const express = require("express");
const router = express.Router();
const {
  getAllPlaylists,
  getPlaylistDetails,
  createPlaylist,
  addSongToPlaylist,
  likePlaylist,
} = require("../controllers/playlistController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllPlaylists);
router.post("/", verifyToken, createPlaylist);
router.post("/:playlistId/songs/:songId", verifyToken, addSongToPlaylist);
router.post("/:playlistId/like", verifyToken, likePlaylist);
router.get("/:playlistId", getPlaylistDetails);

module.exports = router;
