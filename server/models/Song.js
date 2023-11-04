const mongoose = require("mongoose");
const { CommentSchema } = require("./Comment");

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artiste: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artiste",
      required: true,
    },
    coverImage: {
      type: String,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },
    duration: String,
    audioURL: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [CommentSchema],
    releaseDate: Date,
    genre: String,
    lyrics: String,
  },
  { timestamps: true }
);

SongSchema.methods.toogleLike = async function (userId) {
  const isLiked = this.likes.includes(userId);
  if (isLiked) {
    this.likes.pull(userId);
  } else {
    this.likes.addToSet(userId);
  }
  await this.save();
  return !isLiked;
};

module.exports = mongoose.model("Song", SongSchema);
