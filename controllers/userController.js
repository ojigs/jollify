const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// @desc  Get specific user
// @route GET api/users/:userId
// @access Public
const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("username bio country image playlist")
    .populate("playlist", "title coverImage")
    .lean()
    .exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc  Update user details
// @route PATCH api/users/edit
// @access Private
const editUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { username, bio, country, image } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, bio, country, image },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(updatedUser);
});

// @desc  Upload profile image
// @route POST api/users/upload
// @access Private
const uploadImage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  await user.updateOne({ image: result.secure_url });
  res.status(200).json({ message: "Profile image successfully uploaded!" });
});

module.exports = { getUserDetails, editUserDetails, uploadImage };
