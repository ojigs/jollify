import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeadphones } from "react-icons/fa";

const PlaylistCard = ({ playlist, type }) => {
  const selectedTheme = useSelector((state) => state.theme);

  const isUserPlaylist = type === "user";

  return (
    <article className="group bg-secondary-100 rounded-lg shadow-lg p-2 md:p-4 transition transform hover:scale-105">
      <div className="relative bg-secondary-200">
        <Link to={`/playlists/${playlist._id}`}>
          {playlist.coverImage ? (
            <img
              src={playlist.coverImage}
              alt={playlist.title}
              className="w-full h-24 sm:h-40 object-cover rounded-t-lg relative"
            />
          ) : (
            <FaHeadphones className="w-full p-4 h-24 sm:h-40 text-gray-400" />
          )}
        </Link>
      </div>
      <div className="p-2 md:p-4 flex flex-col">
        <Link
          to={`/playlists/${playlist._id}`}
          className={`text-sm sm:text-base lg:text-lg font-semibold mb-1 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
        >
          {playlist.title}
        </Link>
        {!isUserPlaylist && (
          <Link
            to={`/users/${playlist.createdBy._id}`}
            className={`text-xs sm:text-sm lg:text-base text-gray-500 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
          >
            {playlist.createdBy.username}
          </Link>
        )}
      </div>
    </article>
  );
};

export default PlaylistCard;
