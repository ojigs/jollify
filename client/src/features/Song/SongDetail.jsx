import { useSelector } from "react-redux";
import { BsPlay } from "react-icons/bs";
import LikeButton from "../../components/LikeButton";
import { FaCompactDisc } from "react-icons/fa";
import { Link } from "react-router-dom";

const SongDetail = ({ song }) => {
  const { title, coverImage, artiste, album, genre, likes } = song;
  const selectedTheme = useSelector((state) => state.theme);

  return (
    <article
      className="relative bg-secondary-200 md:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${coverImage || ""})` }}
    >
      <div className=" bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-10 p-6 text-white backdrop-blur-2xl">
        <div className="w-48 rounded-md h-48 md:w-60 md:h-60 overflow-hidden bg-secondary-100 bg-center bg-cover bg-no-repeat shadow-md shadow-secondary-200">
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
          <p className={` mt-2`}>
            <span className="text-gray-400 mr-2">Genre:</span>{" "}
            <span className="text-gray-200 hover:text-${selectedTheme}-50">
              {genre}
            </span>
          </p>
          <div className="flex flex-row gap-4 mt-6">
            <button
              className={`inset-0 flex items-center justify-center bg-${selectedTheme}-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-6`}
            >
              <span className="mr-2">Play</span>
              <BsPlay className="text-white text-2xl md:text-4xl" />
            </button>
            <LikeButton likes={likes} />
          </div>
        </article>
      </div>
    </article>
  );
};

export default SongDetail;
