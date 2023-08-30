const express = require("express");
const router = express.Router();
const {
  getAllAlbums,
  getAlbumDetails,
} = require("../controllers/albumController");

router.get("/", getAllAlbums);
router.get("/:songId", getAlbumDetails);

module.exports = router;
