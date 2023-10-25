import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCompactDisc } from "react-icons/fa";
import LikeButton from "../../components/LikeButton";
import AddToPlaylistButton from "../../components/AddToPlaylistButton";
import { setPlaying, setQueue } from "../MusicPlayer/playerSlice";
import { motion } from "framer-motion";

const SongDetail = ({ song }) => {
  const { title, coverImage, artiste, album, genre, likes } = song;
  const selectedTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setQueue({ queue: [song] }));
    dispatch(setPlaying(true));
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary-200 sm:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${coverImage || ""})` }}
    >
      <div className=" bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-10 p-6 text-white backdrop-blur-2xl">
        <div className="w-48 rounded-md h-48 md:w-60 md:h-60 overflow-hidden bg-secondary-200 bg-center bg-cover bg-no-repeat shadow-md shadow-secondary-200">
          {coverImage ? (
            <img
              src={coverImage}
              alt={`${title} Cover`}
              className="w-full h-full object-cover rounded-md backdrop-blur-2xl"
            />
          ) : (
            <FaCompactDisc className="p-4 text-gray-400 w-full h-full object-cover backdrop-blur-2xl" />
          )}
        </div>
        <article className="flex flex-col">
          <h2 className={`text-2xl text-${selectedTheme}-50 font-bold mb-4`}>
            {title.toUpperCase()}
          </h2>
          <p className="mt-2">
            <span className="text-gray-400 mr-2">Artiste: </span>{" "}
            <Link
              to={`/artistes/${artiste._id}`}
              className={`text-gray-200 hover:text-${selectedTheme}-50 `}
            >
              {artiste.name}
            </Link>
          </p>
          {album && (
            <p className="mt-2">
              <span className="text-gray-400 mr-2">Album: </span>{" "}
              <Link
                to={`/albums/${album._id}`}
                className={`text-gray-200 hover:text-${selectedTheme}-50 `}
              >
                {album.title}
              </Link>
            </p>
          )}
          <p className={`mt-2`}>
            <span className="text-gray-400 mr-2">Genre:</span>{" "}
            <span className="text-gray-200 hover:text-${selectedTheme}-50">
              {genre}
            </span>
          </p>
          <div className="mt-6 flex items-stretch h-10 gap-4">
            <button
              onClick={handlePlay}
              className={`inline-flex items-center bg-${selectedTheme}-50 bg-opacity-80 active:bg-opacity-100 active:translate-y-1 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4`}
            >
              <span className="mr-2 text-xl">Play</span>
            </button>
            <span className=" bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4 h-full inline-flex items-center">
              <LikeButton songId={song._id} type={"song"} />
              <span className="ml-2">{likes && likes.length}</span>
            </span>
            <span
              className={`text-white bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-ou px-3 py-1 h-full inline-flex items-center`}
            >
              <AddToPlaylistButton songId={song._id} />
            </span>
          </div>
        </article>
      </div>
    </motion.article>
  );
};

export default SongDetail;
