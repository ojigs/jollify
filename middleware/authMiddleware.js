const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const verifyToken = asyncHandler((req, res, next) => {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send("Not Authorized, no token");
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
    if (err) {
      return res.status(401).send("Not Authorized, invalid token");
    }
    const foundUser = await User.findOne({ id: decodedUser.id });
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
