const express = require("express");
const router = express.Router();
const {
  getAllArtistes,
  getArtisteDetails,
  likeArtiste,
} = require("../controllers/artisteController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllArtistes);
router.get("/:artisteId", getArtisteDetails);
router.get("/:artisteId/like", verifyToken, likeArtiste);

module.exports = router;
