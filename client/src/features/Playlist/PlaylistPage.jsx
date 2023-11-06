import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlaylistDetailsQuery } from "./playlistApiSlice";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { Helmet } from "react-helmet-async";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";

const PlaylistPage = () => {
  const { id } = useParams();
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: playlist,
    isLoading,
    isError,
    error,
  } = useGetPlaylistDetailsQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className=" text-gray-200">
      <Helmet prioritizeSeoTags>
        <title>{`${playlist.title} - Stream on Jollify`}</title>
        <link
          rel="canonical"
          href={`https://jollify.vercel.app/playlists/${playlist._id}`}
        />
        <meta
          name="description"
          content={`Stream ${playlist.title} on Jollify and enjoy other amazing music collections.`}
        />
        <meta
          property="og:title"
          content={`${playlist.title} - Stream on Jollify`}
        />
        <meta
          property="og:description"
          content={`Stream ${playlist.title} on Jollify and enjoy other amazing music collections.`}
        />
        <meta property="og:image" content={playlist.coverImage || ""} />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/playlists/${playlist._id}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${playlist.title} - Stream on Jollify`}
        />
        <meta
          name="twitter:description"
          content={`Stream ${playlist.title} on Jollify and enjoy other amazing music collections.`}
        />
        <meta name="twitter:image" content={playlist.coverImage || ""} />
      </Helmet>
      <ResourceDetail resource={playlist} resourceType={"playlist"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        {!playlist?.songs?.length ? (
          <button
            className={`bg-${selectedTheme} text-gray-100 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-md text-lg font-semibold transition duration-300`}
            onClick={() => navigate("/explore")}
          >
            Find songs on Jollify
          </button>
        ) : (
          <SongList songs={playlist.songs} listType={"playlist"} />
        )}
        <AddToPlaylistModal />
        <CreatePlaylistModal />
      </section>
    </section>
  );
};

export default PlaylistPage;
