const { required } = require("joi");
const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artiste: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artiste",
    required: true,
  },
  releaseDate: Date,
  genre: String,
  coverImage: String,
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

module.exports = mongoose.model("Album", AlbumSchema);
