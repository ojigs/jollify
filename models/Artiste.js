const mongoose = require("mongoose");

const ArtisteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
});

module.exports = mongoose.model("Artiste", ArtisteSchema);
