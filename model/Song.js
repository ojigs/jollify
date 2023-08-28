const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artiste",
    required: true,
  },
  coverImage: {
    type: String,
    default:
      "https://res.cloudinary.com/ojigs/image/upload/v1686067806/images_-_2022-09-26T080853.354_it1tgl.jpg",
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  duration: String,
  audioURL: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  releaseDate: Date,
  genre: String,
});

module.exports = mongoose.model("Song", SongSchema);
