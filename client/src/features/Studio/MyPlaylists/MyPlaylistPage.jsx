import { useDispatch } from "react-redux";
import { MdQueue } from "react-icons/md";
import PlaylistCard from "../../Playlist/PlaylistCard";
import { useGetCurrentUserQuery } from "../../Users/userApiSlice";
import Loading from "../../../components/Loading";
import ErrorMsg from "../../../components/ErrorMsg";
import { toggleCreatePlaylistModal } from "../../../app/modalSlice";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const emptyArray = [];

const MyPlaylistPage = () => {
  const {
    data: playlists,
    isLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data: data?.playlist ?? emptyArray,
      isLoading,
      isError,
      error,
    }),
  });
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  const openModal = () => {
    dispatch(toggleCreatePlaylistModal());
  };

  return (
    <section className="text-gray-100">
      <Helmet>
        <title>My Playlists - Jollify</title>
      </Helmet>
      <h1 className="text-xl md:text-3xl font-semibold mb-8">My Playlist</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <button
          onClick={openModal}
          className="w-full h-full min-h[120px] sm:min-h-[185px] lg:min-h-[256px] flex flex-col gap-2 justify-center items-center rounded-lg shadow-lg bg-secondary-100 hover:text-gray-400 active:text-opacity-80 cursor-pointer"
        >
          <MdQueue className="text-3xl" />
          <span>Create Playlist</span>
        </button>
        {playlists &&
          playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              type={"user"}
            />
          ))}
      </motion.div>
    </section>
  );
};

export default MyPlaylistPage;
