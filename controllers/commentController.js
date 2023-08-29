const Comment = require("../models/Comment");
const Song = require("../models/Song");

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
  const newComment = new Comment({
    text,
    user: userId,
    song: songId,
  });
  await newComment.save();
  res.status(201).json(newComment);
});

module.exports = { addComment };
