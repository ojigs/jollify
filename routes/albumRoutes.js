const express = require("express");
const router = express.Router();
const {
  getAllAlbums,
  getAlbumDetails,
  likeAlbum,
} = require("../controllers/albumController");
import { verifyToken } from "../middleware/authMiddleware";

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumDetails);
router.post("/:albumId/like", verifyToken, likeAlbum);

module.exports = router;
