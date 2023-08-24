const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  refresh,
} = require("../controller/userController");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logOutUser);
router.post("/refresh", refresh);

module.exports = router;
