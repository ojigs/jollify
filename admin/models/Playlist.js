import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  coverImage: {
    type: String,
    default:
      "https://res.cloudinary.com/ojigs/image/upload/v1686067806/images_-_2022-09-26T080853.354_it1tgl.jpg",
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

export const Playlist = mongoose.model("Playlist", PlaylistSchema);
