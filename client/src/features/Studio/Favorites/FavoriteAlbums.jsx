import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../../app/apiSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AlbumCard from "../../Album/AlbumCard";
import ErrorMsg from "../../../components/ErrorMsg";

const emptyArray = [];

const FavoriteAlbums = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { id } = useSelector((state) => state.auth);
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(id, {
    skip: !id,
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data: data?.favoriteAlbums ?? emptyArray,
      isLoading,
      isError,
      error,
    }),
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center h-full">
        <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums?.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteAlbums;
