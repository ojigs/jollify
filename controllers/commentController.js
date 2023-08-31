const Comment = require("../models/Comment");
const Song = require("../models/Song");
const asyncHandler = require("express-async-handler");

// @desc  Add comment to song
// @route POST api/songs/:songId/comments
// @access Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const songId = req.params.songId;
  const userId = req.user.id;

  const song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  const newComment = new Comment({
    text,
    user: userId,
    song: songId,
  });
  await newComment.save();

  // update songs comment field
  song.comments.push(newComment._id);
  await song.save();

  res.status(201).json(newComment);
});

// @desc  Get all comments for a specific song
// @route GET api/songs/:songId/comments
// @access Public
const getComments = asyncHandler(async (req, res) => {
  const { songId } = req.params;
  const comments = await Comment.find({ song: songId })
    .populate("user", "username")
    .sort({ createdAt: -1 });
  res.json(comments);
});

module.exports = { addComment, getComments };
