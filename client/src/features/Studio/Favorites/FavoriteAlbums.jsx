import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../../Album/AlbumCard";

const FavoriteAlbums = ({ albums }) => {
  const selectedTheme = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/albums");
  };
  return (
    <>
      {!albums?.length ? (
        <div className=" h-4/6 flex flex-col justify-center items-center">
          <p className="text-xl mb-4 text-center">
            You haven`t added any album to favorites
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
          {albums.map((album) => (
            <AlbumCard key={album._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteAlbums;
