const Song = require("../models/Song");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc  Get all songs
// @route GET api/songs
// @access Public
const getAllSongs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const startIndex = (page - 1) * limit;
  const songs = await Song.find()
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });
  if (!songs.length) {
    return res.status(404).json({ message: "No songs found" });
  }
  const shuffledArray = shuffleArray(songs);
  res.status(200).json(shuffleArray);
});

// @desc  Get specific song
// @route GET api/songs/:songId
// @access Public
const getSongDetails = asyncHandler(async (req, res) => {
  const songId = req.params.songId;
  // find song by id and populate the artiste and album field with the name and title; the comments field with its document as well as the username of the user
  const song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  const populatedSong = await song
    .populate("artiste", "name")
    .populate("album", "title")
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: { path: "user", select: "username" },
    })
    .lean()
    .exec();
  res.status(200).json(populatedSong);
});

// @desc  Like a song
// @route GET api/songs/:songId/like
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
  //   update user favorite if like was toogled
  if (toogled) {
    user.favorites.push(songId);
  } else {
    user.favorites.pull(songId);
  }
  await user.save();
  res.status(200).json({ message: "Like status toogled" });
});

// Fisher-Yates shuffle algorithm to shuffle songs array
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = (Math.floor(Math.random() * (i + 1))[
      (shuffledArray[i], shuffledArray[j])
    ] = [shuffledArray[j], shuffledArray[i]]);
  }
  return shuffledArray;
}

module.exports = { getAllSongs, getSongDetails, likeSong };
