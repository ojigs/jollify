import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFolderOpen } from "react-icons/fa";

const AlbumCard = ({ album }) => {
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <article className="group bg-secondary-100 rounded-lg shadow-lg p-2 md:p-4 transition transform hover:scale-105">
      <div className="relative bg-secondary-200">
        <Link to={`/albums/${album._id}`}>
          {album.coverImage ? (
            <img
              src={album.coverImage}
              alt={album.title}
              className="w-full h-24 sm:h-40 object-cover rounded-t-lg relative"
            />
          ) : (
            <FaFolderOpen className="w-full p-4 h-24 sm:h-40 text-gray-400" />
          )}
        </Link>
      </div>
      <div className="p-2 md:p-4 flex flex-col">
        <Link
          to={`/albums/${album._id}`}
          className={`text-sm sm:text-base lg:text-lg font-semibold mb-1 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
        >
          {album.title}
        </Link>
        <Link
          to={`/artistes/${album.artiste._id}`}
          className={`text-xs sm:text-sm lg:text-base hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
        >
          {album.artiste.name}
        </Link>
      </div>
    </article>
  );
};

export default AlbumCard;
