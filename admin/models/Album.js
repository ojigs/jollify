import mongoose from "mongoose";

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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

AlbumSchema.methods.toogleLike = async function (userId) {
  const isLiked = this.likes.includes(userId);
  if (isLiked) {
    this.likes.pull(userId);
  } else {
    this.likes.addToSet(userId);
  }
  await this.save();
  return !isLiked;
};

export const Album = mongoose.model("Album", AlbumSchema);
