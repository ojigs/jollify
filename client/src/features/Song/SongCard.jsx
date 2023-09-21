import { Link } from "react-router-dom";
import { FaPlay, FaCompactDisc } from "react-icons/fa";

const SongCard = ({ song }) => {
  return (
    <article className="group bg-secondary-100 rounded-lg shadow-lg p-4 transition transform hover:scale-105">
      <div className="relative bg-secondary-200">
        {song.coverImage ? (
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-full h-40 object-cover rounded-t-lg relative"
          />
        ) : (
          <FaCompactDisc className="w-full p-4 h-40 text-gray-400" />
        )}
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="bg-accent bg-opacity-20 text-white flex justify-center items-center w-14 h-14 active:bg-accent-50 active:bg-opacity-40 rounded-full hover:bg-accent-dark transition">
            <FaPlay className="text-white text-xl text-opacity-70 hover:text-opacity-100" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link
          to={`/songs/${song._id}`}
          className="text-lg font-semibold mb-1 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-accent"
        >
          {song.title}
        </Link>
        <p className="text-gray-500">{song.artiste}</p>
      </div>
    </article>
  );
};

export default SongCard;
