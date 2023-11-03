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
router.post("/:artisteId/like", verifyToken, likeArtiste);

module.exports = router;
