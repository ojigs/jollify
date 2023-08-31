const express = require("express");
const router = express.Router();
const {
  getAllAlbums,
  getAlbumDetails,
  likeAlbum,
} = require("../controllers/albumController");

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumDetails);
router.post("/:albumId/like", likeAlbum);

module.exports = router;
