const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authMiddleware");

// @desc  Register new user
// @route POST /user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // verify that all fields were filled
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check for existing user
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "A user with that email already exists" });
    } else {
      return res
        .status(400)
        .json({ message: "Username taken. Please choose another username" });
    }
  }

  const newUser = await User.create({ username, email, password });

  if (newUser) {
    const { accessToken } = generateAccessToken({
      id: newUser._id,
      username: newUser.username,
    });
    const { refreshToken } = generateRefreshToken({
      id: newUser._id,
      username: newUser.username,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        favorites: newUser.favorites,
      },
      token: { accessToken },
    });
  }
});

// @desc  Login user
// @route POST /user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // verify that all fields were filled
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check that user exist
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // compare password
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({ message: "Incorrect username or password" });
  }

  const { accessToken } = generateAccessToken({
    id: user._id,
    username: user.username,
  });
  const { refreshToken } = generateRefreshToken({
    id: user._id,
    username: user.username,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days (match refreshToken expiration)
  });

  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      favorites: user.favorites,
    },
    token: { accessToken },
  });
});

// @desc  Refresh token
// @route POST /user/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Invalid or expired refresh token" });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
  // generate new access token
  const { accessToken } = generateAccessToken({
    id: decoded.id,
    username: decoded.username,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });

  res.status(200).json({ accessToken });
});

// @desc  Log out user
// @route POST /user/logout
// @access Public
const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Log out successful" });
});

module.exports = { registerUser, loginUser, logOutUser, refresh };
