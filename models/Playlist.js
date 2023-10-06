const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  coverImage: {
    type: String,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
