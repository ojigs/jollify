const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const verifyToken = asyncHandler((req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).send("Not Authorized, no token");
  }
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decodedUser) => {
    if (err) {
      return res.status(401).send("Not Authorized, invalid token");
    }
    const foundUser = await User.findOne({ _id: decodedUser.id });
    if (!foundUser) {
      return res.status(401).send("Unauthorized! User not found");
    }
    req.user = foundUser;
    next();
  });
});

const generateAccessToken = ({ id, username }) => {
  const accessToken = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return {
    accessToken,
  };
};

const generateRefreshToken = ({ id, username }) => {
  const refreshToken = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return {
    refreshToken,
  };
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
