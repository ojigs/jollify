const express = require("express");
const router = express.Router();
const {
  getAllArtistes,
  getArtisteDetails,
  likeArtiste,
} = require("../controllers/artisteController");

router.get("/", getAllArtistes);
router.get("/:artisteId", getArtisteDetails);
router.get("/:artisteId/like", likeArtiste);

module.exports = router;
