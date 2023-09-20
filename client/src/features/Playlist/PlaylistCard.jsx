import { Link } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

const PlaylistCard = ({ playlist }) => {
  return (
    <article className="group bg-secondary-100 rounded-lg shadow-lg p-4 transition transform hover:scale-105">
      <div className="relative bg-secondary-200">
        {playlist.coverImage ? (
          <img
            src={playlist.coverImage}
            alt={playlist.title}
            className="w-full h-40 object-cover rounded-t-lg relative"
          />
        ) : (
          <FaHeadphones className="w-full p-4 h-40 text-gray-400" />
        )}
      </div>
      <div className="p-4">
        <Link
          to={`/playlists/${playlist._id}`}
          className="text-lg font-semibold mb-1 hover:border-b-2 hover:border-b-accent"
        >
          {playlist.title}
        </Link>
        <p className="text-gray-500">{playlist.createdBy}</p>
      </div>
    </article>
  );
};

export default PlaylistCard;
