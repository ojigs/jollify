const Song = require("../models/Song");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../util/index");

// @desc  Get all songs
// @route GET api/songs
// @access Public
const getAllSongs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const startIndex = (page - 1) * limit;
  const songs = await Song.find({})
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });
  if (!songs.length) {
    return res.status(404).json({ message: "No songs found" });
  }
  const shuffledSongs = shuffleArray(songs);
  res.status(200).json(shuffledSongs);
});

// @desc  Get specific song
// @route GET api/songs/:songId
// @access Public
const getSongDetails = asyncHandler(async (req, res) => {
  const songId = req.params.songId;
  // find song by id and populate the artiste and album field with the name and title; the comments field with its document as well as the username of the user
  const song = await Song.findById(songId)
    .populate("artiste", "name")
    .populate("album", "title")
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: { path: "user", select: "username" },
    })
    .lean()
    .exec();
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  res.status(200).json(song);
});

// @desc  Get any song
// @route GET api/songs/any
// @access Public
const getAnySong = asyncHandler(async (req, res) => {
  const count = await Song.countDocuments({ coverImage: { $ne: "" } });
  const randomIndex = Math.floor(Math.random() * count);
  const randomSong = await Song.findOne({ coverImage: { $ne: "" } })
    .skip(randomIndex)
    .populate("artiste", "name image")
    .populate("album", "title")
    .lean();
  if (!randomSong) {
    return res.status(404).json({ message: "No song with cover image found" });
  }
  res.status(200).json(randomSong);
});

// @desc  Like a song
// @route POST api/songs/:songId/like
// @access Private
const likeSong = asyncHandler(async (req, res) => {
  const songId = req.params.songId;
  const userId = req.user.id;
  const song = await Song.findById(songId);
  const user = await User.findById(userId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  //   check if user already liked song
  const toogled = await song.toogleLike(userId);
  //   update user favorite songs if like was toogled
  if (toogled) {
    user.favoriteSongs.push(songId);
  } else {
    user.favoriteSongs.pull(songId);
  }
  await user.save();
  res.status(200).json({ message: "Like status toogled" });
});

module.exports = { getAllSongs, getSongDetails, getAnySong, likeSong };
