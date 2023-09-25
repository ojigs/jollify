import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SongCard from "../../Song/SongCard";

const FavoriteSongs = ({ songs }) => {
  const selectedTheme = useSelector((state) => state.theme);

  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs.map((song) => (
            <SongCard key={song._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteSongs;
