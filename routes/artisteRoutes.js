const express = require("express");
const router = express.Router();
const {
  getAllArtistes,
  getArtisteDetails,
} = require("../controllers/artisteController");

router.get("/", getAllArtistes);
router.get("/:songId", getArtisteDetails);

module.exports = router;
