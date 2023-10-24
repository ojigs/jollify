import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlay, FaCompactDisc } from "react-icons/fa";
import { setPlaying, setQueue } from "../MusicPlayer/playerSlice";

const SongCard = ({ song }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setQueue({ queue: [song] }));
    dispatch(setPlaying(true));
  };

  return (
    <article className="group bg-secondary-100 rounded-lg shadow-lg p-2 md:p-4 transition transform hover:scale-105">
      <div className="relative bg-secondary-200">
        {song.coverImage ? (
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-full h-24 sm:h-40 object-cover relative"
          />
        ) : (
          <FaCompactDisc className="w-full p-4 h-24 sm:h-40 text-gray-400" />
        )}
        <Link
          to={`/songs/${song._id}`}
          className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        ></Link>
        <button
          onClick={handlePlay}
          className={`bg-${selectedTheme} absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 bg-opacity-50 hover:bg-opacity-100 text-white flex justify-center items-center w-14 h-14 active:bg-${selectedTheme}-50 active:bg-opacity-40 rounded-full transition`}
        >
          <FaPlay className="text-white text-xl text-opacity-70 hover:text-opacity-100" />
        </button>
      </div>
      <div className="p-2 md:p-4 flex flex-col">
        <Link
          to={`/songs/${song._id}`}
          className={`text-sm sm:text-base lg:text-lg font-semibold mb-1 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
        >
          {song.title}
        </Link>
        <Link
          to={`/artistes/${song.artiste._id}`}
          className={`text-xs sm:text-sm lg:text-base text-gray-500 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
        >
          {song.artiste.name}
        </Link>
      </div>
    </article>
  );
};

export default SongCard;
