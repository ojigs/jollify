const Album = require("../models/Album");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../util");

// @desc  Get all Albums
// @route GET api/albums
// @access Public
const getAllAlbums = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const albums = await Album.find({})
    .limit(limit)
    .lean()
    .populate("artiste", "name");
  if (!albums.length) {
    return res.status(404).json({ message: "No albums found" });
  }
  const shuffledAlbums = shuffleArray(albums);
  res.status(200).json(shuffledAlbums);
});

// @desc  Get all Albums
// @route GET api/albums/:albumId
// @access Public
const getAlbumDetails = asyncHandler(async (req, res) => {
  const { albumId } = req.params;
  const album = await Album.findById(albumId)
    .populate("artiste", "name")
    .populate("songs")
    .lean();
  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }
  res.status(200).json(album);
});

// @desc  Like an Albums
// @route POST api/albums/:albumId/like
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
