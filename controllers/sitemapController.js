const Song = require("../models/Song");
const Artiste = require("../models/Artiste");
const Playlist = require("../models/Playlist");
const Album = require("../models/Album");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");

let sitemap;

// @desc  Get Sitemap
// @route GET api/sitemap.xml
// @access Public / Private
const getSitemap = asyncHandler(async (req, res) => {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  if (sitemap) {
    res.send(sitemap);
    return;
  }

  const smStream = new SitemapStream({
    hostname: "https://jollify.vercel.app/",
  });
  const pipeline = smStream.pipe(createGzip());

  const songs = await Song.find().lean();
  songs.forEach((song) => {
    smStream.write({
      url: `/songs/${song._id}`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  const playlists = await Playlist.find().lean();
  playlists.forEach((playlist) => {
    smStream.write({
      url: `/playlists/${playlist._id}`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  const albums = await Album.find().lean();
  albums.forEach((album) => {
    smStream.write({
      url: `/albums/${album._id}`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  const artistes = await Artiste.find().lean();
  artistes.forEach((artiste) => {
    smStream.write({
      url: `/artistes/${artiste._id}`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  const users = await User.find().lean();
  users.forEach((user) => {
    smStream.write({
      url: `/users/${user._id}`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  const staticRoutes = [
    "/",
    "/explore",
    "/playlists",
    "/artistes",
    "/albums",
    "/users",
    "/login",
    "/signup",
  ];
  staticRoutes.forEach((route) => {
    smStream.write({ url: route, changefreq: "weekly", priority: 0.7 });
  });

  streamToPromise(pipeline).then((sm) => (sitemap = sm));
  smStream.end();
  pipeline.pipe(res).on("error", (e) => {
    throw e;
  });
});

module.exports = { getSitemap };
