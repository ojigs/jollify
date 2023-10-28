import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetCurrentUserQuery } from "../../Users/userApiSlice";
import SongCard from "../../Song/SongCard";
import ErrorMsg from "../../../components/ErrorMsg";
import { motion } from "framer-motion";

const emptyArray = [];

const FavoriteSongs = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: songs,
    isLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data: data?.favoriteSongs ?? emptyArray,
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
    navigate("/explore");
  };

  return (
    <>
      {!songs?.length ? (
        <div className=" h-4/6 flex flex-col justify-center items-center">
          <p className="text-xl mb-4 text-center">
            You haven`t added any song to favorites
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
          {songs?.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default FavoriteSongs;
