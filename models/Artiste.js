const mongoose = require("mongoose");

const ArtisteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/ojigs/image/upload/v1686067806/images_-_2022-09-26T080853.354_it1tgl.jpg",
  },
});

module.exports = mongoose.model("Artiste", ArtisteSchema);
