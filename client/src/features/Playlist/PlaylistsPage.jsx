import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";

const PlaylistsPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const playlists = [
    {
      _id: 23453,
      createdBy: { _id: 23453, username: "Jollify" },
      title: "Party Time",
      description: "Afro Beats",
    },
  ];

  const handleCreatePlaylist = () => {
    //handle create playlist logic here
    openModal();
  };

  return (
    <section className="container text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Playlists</h1>
        <CreatePlaylistModal
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        >
          <button
            className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
            onClick={handleCreatePlaylist}
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
