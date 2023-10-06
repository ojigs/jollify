const Playlist = require("../models/Playlist");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../util");

// @desc  Get all Playlists
// @route GET api/playlists
// @access Public / Private
const getAllPlaylists = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const playlists = await Playlist.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("createdBy", "username")
    .lean();
  if (!playlists.length) {
    return res.status(404).json({ message: "No playlists found" });
  }
  const shuffledPlaylists = shuffleArray(playlists);
  res.status(200).json(shuffledPlaylists);
});

// @desc  Get specific playlist
// @route GET api/playlists/:playlistId
// @access Public
const getPlaylistDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistIdId)
    .populate("createdBy", "username")
    .populate({
      path: "song",
      select: "title coverImage duration audioURL artiste album",
      populate: [
        { path: "artiste", select: "name" },
        { path: "album", select: "title" },
      ],
    })
    .lean()
    .exec();
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }
  res.status(200).json(playlist);
});

// @desc  Create a playlist
// @route POST api/playlists/
// @access Private
const createPlaylist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const playlist = await Playlist.create({
    title,
    description,
    createdBy: user._id,
  });
  if (!playlist) {
    return res.status(400).json({ message: "Playlist creation failed" });
  }
  // Update user's collection of playlists
  await user.updateOne({ playlist: playlist._id });
  res.status(201).json(playlist);
});

// @desc  Add song to playlist
// @route POST api/playlists/:playlistId/songs/:songId
// @access Private
const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.body;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404), json({ message: "Playlist not found" });
  }
  if (!playlist.songs.includes(songId)) {
    playlist.push(songId);
    await playlist.save();
  }
  res.status(200).json(playlist);
});

module.exports = {
  getAllPlaylists,
  getPlaylistDetails,
  createPlaylist,
  addSongToPlaylist,
};
