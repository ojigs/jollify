const express = require("express");
const router = express.Router();
const { getSitemap } = require("../controllers/sitemapController");

router.get("/", getSitemap);

module.exports = router;
