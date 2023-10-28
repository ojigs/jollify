import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../Users/userApiSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PlaylistCard from "../../Playlist/PlaylistCard";
import ErrorMsg from "../../../components/ErrorMsg";
import { motion } from "framer-motion";

const emptyArray = [];

const FavoritePlaylists = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: playlists,
    isLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data: data?.favoritePlaylists ?? emptyArray,
      isLoading,
      isError,
      error,
    }),
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center h-4/6">
        <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-4/6">
        <ErrorMsg error={error} />;
      </div>
    );
  }

  const handleClick = () => {
    navigate("/playlists");
  };

  return (
    <>
      {!playlists?.length ? (
        <div className=" h-4/6 flex flex-col justify-center items-center">
          <p className="text-xl mb-4 text-center">
            You haven`t added any playlist to favorites
          </p>
          <button
            className={`bg-${selectedTheme} text-gray-100 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full text-lg font-semibold transition duration-300`}
            onClick={handleClick}
          >
            Explore on Jollify
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {playlists?.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default FavoritePlaylists;
