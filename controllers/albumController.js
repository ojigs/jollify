const Album = require("../models/Album");
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

module.exports = { getAllAlbums, getAlbumDetails };
