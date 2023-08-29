const express = require("express");
const router = express.Router();
const { getAllSongs, getSongDetails } = require("../controllers");

router.get("/", getAllSongs);
router.get("/:songId", getSongDetails);

module.exports = router;
