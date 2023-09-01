const express = require("express");
const router = express.Router();
const {
  getAllPlaylists,
  getPlaylistDetails,
  createPlaylist,
  addSongToPlaylist,
} = require("../controllers/playlistController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllPlaylists);
router.get("/:playlistId", getPlaylistDetails);
router.post("/", verifyToken, createPlaylist);
router.post("/:playlistId/songs/:songId", verifyToken, addSongToPlaylist);

module.exports = router;
