const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  refresh,
} = require("../controller/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logOutUser);
router.post("/refresh", loginLimiter, refresh);

module.exports = router;
