import { useDispatch, useSelector } from "react-redux";
import { useGetAllPlaylistsQuery } from "./playlistApiSlice";
import {
  toggleCreatePlaylistModal,
  toggleLoginModal,
  setMessage,
} from "../../app/modalSlice";
import { FaPlus } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const PlaylistsPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: playlists,
    isLoading,
    isError,
    error,
  } = useGetAllPlaylistsQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openModal = () => {
    if (!isAuthenticated) {
      dispatch(setMessage("create a playlist"));
      dispatch(toggleLoginModal());
    } else {
      dispatch(toggleCreatePlaylistModal());
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="text-gray-100">
      <Helmet prioritizeSeoTags>
        <title>{`Playlists - Jollify`}</title>
        <link rel="canonical" href={`https://jollify.vercel.app/playlists`} />
        <meta
          name="description"
          content={`Unleash your musical journey from our collection of playlists`}
        />
        <meta property="og:title" content="Playlists - Jollify" />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/playlists`}
        />
        <meta
          property="og:description"
          content={`Unleash your musical journey from our collection of playlists`}
        />
        <meta name="twitter:title" content="Playlists - Jollify" />
        <meta
          name="twitter:description"
          content="Unleash your musical journey from our collection of playlists"
        />
      </Helmet>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Playlists</h1>
        <button
          className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
          onClick={openModal}
        >
          <FaPlus className="text-xs mr-2" />
          <span>Create Playlist</span>
        </button>
      </div>
      <p className="mb-8 text-gray-200">
        Unleash your musical journey from our collection of playlists
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </motion.div>
    </section>
  );
};

export default PlaylistsPage;
