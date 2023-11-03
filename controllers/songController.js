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
  const [songs, total] = await Promise.all([
    Song.find({})
      .skip(startIndex)
      .limit(limit)
      .populate("artiste", "name")
      .lean(),
    Song.countDocuments(),
  ]);
  if (!songs.length) {
    return res.status(404).json({ message: "No songs found" });
  }
  const shuffledSongs = shuffleArray(songs);
  res.status(200).json({ songs: shuffledSongs, total });
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
      path: "comments.user",
      select: "username image",
    })
    .lean()
    .exec();
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  song.comments.sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json(song);
});

// @desc  Get top songs
// @route GET api/songs/top
// @access Public
const getTopSongs = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const songs = await Song.aggregate([
    // { $match: { coverImage: { $ne: "" } } },
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
        audioURL: 1,
        artiste: { _id: "$artiste._id", name: "$artiste.name" },
        album: { _id: "$album._id", title: "$album.title" },
      },
    },
    { $sample: { size: limit } },
  ]);
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
        coverImage: 1,
        audioURL: 1,
        artiste: {
          _id: "$artiste._id",
          name: "$artiste.name",
          image: "$artiste.image",
        },
        album: { _id: "$album._id", title: "$album.title" },
      },
    },
    { $sample: { size: 1 } },
  ]);
  if (!randomSong || randomSong.length === 0) {
    return res.status(404).json({ message: "No featured song available" });
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

// @desc  Add comment to song
// @route POST api/songs/:songId/comment
// @access Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const songId = req.params.songId;
  const userId = req.user.id;

  const song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  const newComment = {
    text,
    user: userId,
  };

  // update songs comment field
  song.comments.push(newComment);
  await song.save();

  res.status(201).json({ message: "Comment added" });
});

module.exports = {
  getAllSongs,
  getSongDetails,
  getAnySong,
  getTopSongs,
  likeSong,
  addComment,
};
