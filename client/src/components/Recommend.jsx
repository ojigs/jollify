import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllAlbumsQuery } from "../features/Album/albumApiSlice";
import { useGetAllPlaylistsQuery } from "../features/Playlist/playlistApiSlice";
import { AiOutlineLoading } from "react-icons/ai";
import Card from "./Card";
import ErrorMsg from "./ErrorMsg";

const Recommend = ({ type }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: albums,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    error: albumError,
  } = useGetAllAlbumsQuery(10, {
    skip: type !== "albums",
    refetchOnReconnect: true,
  });
  const {
    data: playlists,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
    error: playlistError,
  } = useGetAllPlaylistsQuery(10, {
    skip: type !== "playlists",
    refetchOnReconnect: true,
  });

  const data = albums || playlists;
  const isLoading = isAlbumLoading || isPlaylistLoading;
  const isError = isAlbumError || isPlaylistError;
  const error = albumError || playlistError;

  return (
    <section className="text-gray-200 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">
          Recommended {type[0].toUpperCase() + type.slice(1)}
        </h2>
        <Link
          to={`/${type}`}
          className={`text-base text-${selectedTheme} hover:text-${selectedTheme}-50 active:text-opacity-75 font-bold `}
          title={`${type}`}
        >
          See more
        </Link>
      </div>
      <article className="flex overflow-x-auto gap-8">
        {isLoading && (
          <div className="flex-grow flex justify-center items-center h-36 md:h-40">
            <AiOutlineLoading className="text-3xl animate-spin" />
          </div>
        )}
        {isError && (
          <div className="flex-grow h-36 md:h-40">
            <ErrorMsg error={error} />
          </div>
        )}
        {data &&
          data?.map((item) => (
            <Card key={item._id} resource={item} type={type} />
          ))}
      </article>
    </section>
  );
};

export default Recommend;
