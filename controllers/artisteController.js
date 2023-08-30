const Artiste = require("../models/Artiste");
const Song = require("../models/Song");
const Album = require("../models/Album");
const asyncHandler = require("express-async-handler");

// @desc  Get all Artistes
// @route GET api/artistes
// @access Public
const getAllArtistes = asyncHandler(async (req, res) => {
  const artistes = await Artiste.find();
  if (!artistes) {
    return res.status(404).json({ message: "No artistes found" });
  }
  res.status(200).json(artistes);
});

// @desc  Get specific Artiste
// @route GET api/artistes/:artisteId
// @access Public
const getArtisteDetails = asyncHandler(async (req, res) => {
  const { artisteId } = req.params;
  const artiste = await Artiste.findById(artisteId);
  if (!artiste) {
    return res.status(404).json({ message: "Artiste not found" });
  }
  const songs = await Song.find({ artiste: artisteId }).lean().exec();
  const albums = await Album.find({ artiste: artisteId }).lean().exec();
  res.status(200).json({ artiste, songs, albums });
});

module.exports = { getAllArtistes, getArtisteDetails };
