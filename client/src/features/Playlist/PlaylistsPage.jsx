import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllPlaylistsQuery } from "../../app/apiSlice";
import { FaPlus } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";

const PlaylistsPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: playlists,
    isLoading,
    isError,
    error,
  } = useGetAllPlaylistsQuery();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Playlists</h1>
        <CreatePlaylistModal
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        >
          <button
            className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
            onClick={() => openModal()}
          >
            <FaPlus className="text-xs mr-2" />
            <span>Create Playlist</span>
          </button>
        </CreatePlaylistModal>
      </div>
      <p className="mb-8 text-gray-200">
        Unleash your musical journey from our collection of playlists
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
};

export default PlaylistsPage;
