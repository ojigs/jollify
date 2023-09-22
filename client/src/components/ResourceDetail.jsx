import { useSelector } from "react-redux";
import { BsPlay } from "react-icons/bs";
import LikeButton from "./LikeButton";
import { aggregateSongsDuration } from "../utils/index";
import { FaHeadphones, FaFolderOpen, FaUserAstronaut } from "react-icons/fa";

const ResourceDetail = ({ resource, resourceType }) => {
  const {
    title,
    name,
    bio,
    artiste,
    description,
    genre,
    likes,
    songs,
    coverImage,
    image,
    createdBy,
    releaseDate,
  } = resource;
  const selectedTheme = useSelector((state) => state.theme);

  const isArtiste = resourceType === "artiste";
  const isPlaylist = resourceType === "playlist";
  const isAlbum = resourceType === "album";

  return (
    <article
      className="relative bg-secondary-200 md:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${coverImage || image})` }}
    >
      <div className="bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-6 p-6 text-white backdrop-blur-2xl">
        <div
          className={`shadow-lg w-48 ${
            isArtiste ? "rounded-full" : "rounded-md"
          } h-48 md:w-60 md:h-60 overflow-hidden bg-secondary-100 bg-center bg-cover bg-no-repeat shadow-md shadow-secondary-200`}
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
            <FaUserAstronaut className="p-2 text-gray-400 w-full h-full rounded-full object-cover backdrop-blur-2xl" />
          )}
        </div>
        <article className="flex-grow">
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
            <p className={`text-gray-200 hover:text-${selectedTheme}-50 mt-2`}>
              Created By: {createdBy.username}
            </p>
          )}
          {artiste && (
            <p className={`text-gray-200 hover:text-${selectedTheme}-50 mt-2`}>
              Artiste: {artiste.name}
            </p>
          )}
          {releaseDate && (
            <p className={`text-gray-200 mt-2`}>Release Date: {releaseDate}</p>
          )}
          <p className={`text-gray-200 hover:text-${selectedTheme}-50 mt-2`}>
            Genre: {genre}
          </p>
          {songs && (
            <p className={`text-gray-200 hover:text-${selectedTheme}-50 mt-2`}>
              {aggregateSongsDuration(songs)}
            </p>
          )}
          <div className="flex flex-row gap-4 mt-6">
            {!isArtiste && (
              <button
                className={`inset-0 flex items-center justify-center bg-${selectedTheme}-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-6`}
              >
                <span className="mr-2">Play</span>
                <BsPlay className="text-white text-2xl md:text-4xl" />
              </button>
            )}
            <LikeButton likes={likes} />
          </div>
        </article>
      </div>
    </article>
  );
};

export default ResourceDetail;
