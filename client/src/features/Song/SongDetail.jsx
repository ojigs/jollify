import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlay } from "react-icons/bs";
import { FaCompactDisc, FaPlus } from "react-icons/fa";
import LikeButton from "../../components/LikeButton";
import {
  toggleAddToPlaylistModal,
  toggleLoginModal,
  setMessage,
  setSongId,
} from "../../app/modalSlice";

const SongDetail = ({ song }) => {
  const { title, coverImage, artiste, album, genre, likes } = song;
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openModal = (songId) => {
    if (!isAuthenticated) {
      dispatch(setMessage("add song to playlist"));
      dispatch(toggleLoginModal());
    } else {
      dispatch(setSongId(songId));
      dispatch(toggleAddToPlaylistModal());
    }
  };

  return (
    <article
      className="bg-secondary-200 md:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${coverImage || ""})` }}
    >
      <div className=" bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-10 p-6 text-white backdrop-blur-2xl">
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
          <div className="mt-6">
            <button
              className={`bg-${selectedTheme}-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4 mr-2`}
            >
              <span className="mr-2 text-xl">Play</span>
              <span className="align-middle">
                <BsPlay className="inline-block align-baseline text-white text-xl md:text-xl" />
              </span>
            </button>
            <span className=" bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4 h-full inline-block">
              <LikeButton songId={song._id} type={"song"} />
              <span className="ml-2 text-xl">{likes && likes.length}</span>
            </span>
            <button
              onClick={() => openModal(song._id)}
              className={`ml-4 text-gray-400 bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-ou px-3 py-1 h-full`}
            >
              <span className="align-middle text-sm">
                <FaPlus className="inline-block text-white align-baseline" />
              </span>
            </button>
          </div>
        </article>
      </div>
    </article>
  );
};

export default SongDetail;
