import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setQueue, setPlaying } from "../features/MusicPlayer/playerSlice";
import LikeButton from "./LikeButton";
import { aggregateSongsDuration, formatDate } from "../utils/index";
import { FaHeadphones, FaFolderOpen, FaUserAstronaut } from "react-icons/fa";
import { motion } from "framer-motion";

const ResourceDetail = ({ resource, resourceType }) => {
  const {
    title,
    name,
    bio,
    artiste,
    description,
    genre,
    songs,
    coverImage,
    image,
    createdBy,
    releaseDate,
  } = resource;
  const selectedTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const isArtiste = resourceType === "artiste";
  const isPlaylist = resourceType === "playlist";
  const isAlbum = resourceType === "album";

  const handlePlay = () => {
    dispatch(setQueue({ queue: songs }));
    dispatch(setPlaying(true));
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-secondary-200 sm:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${coverImage || image || ""})` }}
    >
      <div className="bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-10 p-6 text-white backdrop-blur-2xl">
        <div
          className={`w-48 h-48 md:w-60 md:h-60 flex-shrink-0 overflow-hidden bg-secondary-200 bg-center bg-cover bg-no-repeat shadow-md shadow-secondary-100 ${
            isArtiste ? "rounded-full" : "rounded-md"
          }`}
        >
          {(coverImage || image) && (
            <img
              src={coverImage || image}
              alt={`${title} Cover`}
              className={`w-full h-full object-cover backdrop-blur-2xl ${
                isArtiste ? "rounded-full" : "rounded-md"
              }`}
            />
          )}
          {isPlaylist && !coverImage && (
            <FaHeadphones className="p-4 text-gray-400 w-full h-full object-cover backdrop-blur-2xl" />
          )}
          {isAlbum && !coverImage && (
            <FaFolderOpen className="p-4 text-gray-400 w-full h-full object-cover backdrop-blur-2xl" />
          )}
          {isArtiste && !image && (
            <FaUserAstronaut className="pt-6 text-gray-400 w-full h-full rounded-full object-cover backdrop-blur-2xl" />
          )}
        </div>
        <article className="flex flex-col">
          {title && (
            <h2 className={`text-2xl text-${selectedTheme}-50 font-bold mb-4`}>
              {title.toUpperCase()}
            </h2>
          )}
          {name && (
            <h2 className={`text-2xl text-${selectedTheme}-50 font-bold mb-4`}>
              {name.toUpperCase()}
            </h2>
          )}
          {description && <p className={`text-gray-200 mt-2`}>{description}</p>}
          {bio && <p className={`text-gray-200 mt-2`}>{bio}</p>}
          {createdBy && (
            <p className="mt-2">
              <span className="text-gray-400 mr-2">Created By: </span>{" "}
              <Link
                to={`/users/${createdBy._id}`}
                className={`text-gray-200 hover:text-${selectedTheme}-50 `}
              >
                {createdBy.username}
              </Link>
            </p>
          )}
          {artiste && (
            <p className="mt-2">
              <span className="text-gray-400 mr-2">Artiste: </span>{" "}
              <Link
                to={`/artistes/${artiste._id}`}
                className={`text-gray-200 hover:text-${selectedTheme}-50 `}
              >
                {artiste.name}
              </Link>
            </p>
          )}
          {releaseDate && (
            <p className={` mt-2`}>
              <span className="text-gray-400 mr-2">Release Date:</span>{" "}
              <span className="text-gray-200 hover:text-${selectedTheme}-50">
                {formatDate(releaseDate)}
              </span>
            </p>
          )}
          {!isArtiste && (
            <p className={` mt-2`}>
              <span className="text-gray-400 mr-2">Genre:</span>{" "}
              <span className="text-gray-200 hover:text-${selectedTheme}-50">
                {genre}
              </span>
            </p>
          )}
          {!isAlbum && songs && (
            <p className={`text-gray-200 hover:text-${selectedTheme}-50 mt-2`}>
              {aggregateSongsDuration(songs)}
            </p>
          )}
          <div className="flex flex-row gap-4 mt-6 h-10 items-stretch">
            {!isArtiste && (
              <button
                onClick={handlePlay}
                className={`inset-0 flex items-center justify-center bg-${selectedTheme}-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4`}
              >
                <span className="mr-2 text-xl">Play</span>
              </button>
            )}
            <span className=" bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4 h-full inline-flex items-center">
              <LikeButton
                albumId={isAlbum ? resource._id : null}
                artisteId={isArtiste ? resource._id : null}
                playlistId={isPlaylist ? resource._id : null}
                type={resourceType}
              />
            </span>
          </div>
        </article>
      </div>
    </motion.article>
  );
};

export default ResourceDetail;
