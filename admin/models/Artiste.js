import mongoose from "mongoose";

const ArtisteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  image: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

ArtisteSchema.methods.toogleLike = async function (userId) {
  const isLiked = this.likes.includes(userId);
  if (isLiked) {
    this.likes.pull(userId);
  } else {
    this.likes.addToSet(userId);
  }
  await this.save();
  return !isLiked;
};

export const Artiste = mongoose.model("Artiste", ArtisteSchema);
