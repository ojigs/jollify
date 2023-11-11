const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleLogin,
  logOutUser,
  refresh,
  twitterLogin,
  facebookLogin,
  loginSuccess,
} = require("../controllers/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyToken } = require("../middleware/authMiddleware");
const schemaValidator = require("../middleware/schemaValidator");

router.get("/refresh", loginLimiter, refresh);
router.post(
  "/register",
  schemaValidator("authRegister"),
  loginLimiter,
  registerUser
);
router.post("/login", schemaValidator("authLogin"), loginLimiter, loginUser);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://jollify.vercel.app/login",
    session: false,
  }),
  googleLogin
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "https://jollify.vercel.app/login",
    session: false,
  }),
  facebookLogin
);

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["profile", "email"],
    session: false,
    failureRedirect: "https://jollify.vercel.app/login",
  })
);
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "https://jollify.vercel.app/login",
    session: false,
  }),
  twitterLogin
);

router.get("/loginSuccess", verifyToken, loginSuccess);

router.post("/logout", logOutUser);

module.exports = router;
