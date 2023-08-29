const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongDetails,
} = require("../controllers/songController");

router.get("/", getAllSongs);
router.get("/:songId", getSongDetails);

module.exports = router;
