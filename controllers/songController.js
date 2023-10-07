const Song = require("../models/Song");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../util/index");

// @desc  Get all songs
// @route GET api/songs
// @access Public
const getAllSongs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const songs = await Song.find({})
    .skip(startIndex)
    .limit(limit)
    .populate("artiste", "name")
    .lean();
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

const getTopSongs = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  console.log(limit);
  const songs = await Song.aggregate([
    // { $match: { coverImage: { $ne: "" } } },
    { $sample: { size: limit } },
    {
      $lookup: {
        from: "artistes",
        localField: "artiste",
        foreignField: "_id",
        as: "artiste",
      },
    },
    {
      $lookup: {
        from: "albums",
        localField: "album",
        foreignField: "_id",
        as: "album",
      },
    },
    { $unwind: "$artiste" },
    { $unwind: "$album" },
    {
      $project: {
        _id: 1,
        title: 1,
        coverImage: 1,
        audioUrl: 1,
        duration: 1,
        artiste: { _id: "$artiste._id", name: "$artiste.name" },
        album: { _id: "$album._id", title: "$album.title" },
      },
    },
  ]);
  console.log("length: ", songs.length);
  if (!songs || songs.length === 0) {
    return res.status(404).json({ message: "No songs found" });
  }
  res.status(200).json(songs);
});

// @desc  Get any song
// @route GET api/songs/any
// @access Public
const getAnySong = asyncHandler(async (req, res) => {
  const randomSong = await Song.aggregate([
    {
      $lookup: {
        from: "artistes",
        localField: "artiste",
        foreignField: "_id",
        as: "artiste",
      },
    },
    { $unwind: "$artiste" },
    { $match: { "artiste.image": { $ne: "" } } },
    { $sample: { size: 1 } },
    {
      $lookup: {
        from: "albums",
        localField: "album",
        foreignField: "_id",
        as: "album",
      },
    },
    { $unwind: "$album" },
    {
      $project: {
        _id: 1,
        title: 1,
        audioUrl: 1,
        artiste: {
          _id: "$artiste._id",
          name: "$artiste.name",
          image: "$artiste.image",
        },
        album: { _id: "$album._id", title: "$album.title" },
      },
    },
  ]);
  if (!randomSong || randomSong.length === 0) {
    return res.status(404).json({ message: "No song with cover image found" });
  }
  res.status(200).json(randomSong[0]);
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

module.exports = {
  getAllSongs,
  getSongDetails,
  getAnySong,
  getTopSongs,
  likeSong,
};
