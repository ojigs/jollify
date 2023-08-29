const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/commentController");

router.post("/", addComment);

module.exports = router;
