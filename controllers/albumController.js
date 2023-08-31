const Album = require("../models/Album");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc  Get all Albums
// @route GET api/albums
// @access Public
const getAllAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find().lean().populate("artiste", "name");
  if (!albums) {
    return res.status(404).json({ message: "No albums found" });
  }
  res.status(200).json(albums);
});

// @desc  Get all Albums
// @route GET api/albums/:albumId
// @access Public
const getAlbumDetails = asyncHandler(async (req, res) => {
  const { albumId } = req.params;
  const album = await Album.findById(albumId)
    .populate("artiste", "name")
    .populate("song");
  if (!album) {
    return res.status(404).json({ message: "album not found" });
  }
  res.status(200).json(album);
});

// @desc  Like an Albums
// @route GET api/albums/:albumId/like
// @access Private
const likeAlbum = asyncHandler(async (req, res) => {
  const albumId = req.params.albumId;
  const userId = req.user.id;
  const album = await Album.findById(albumId);
  const user = await User.findById(userId);
  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }
  //   check if user already liked an album
  const toogled = await album.toogleLike(userId);
  //   update user favorite albums if like was toogled
  if (toogled) {
    user.favoriteAlbums.push(albumId);
  } else {
    user.favoriteAlbums.pull(albumId);
  }
  await user.save();
  res.status(200).json({ message: "Like status toogled" });
});

module.exports = { getAllAlbums, getAlbumDetails, likeAlbum };