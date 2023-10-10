import { useState } from "react";
import { useSelector } from "react-redux";
import { MdQueue } from "react-icons/md";
import PlaylistCard from "../../Playlist/PlaylistCard";
import CreatePlaylistModal from "./CreatePlaylistModal";

const MyPlaylistPage = () => {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playlists = user.playlist;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="container text-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold mb-4">My Playlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CreatePlaylistModal closeModal={closeModal} isModalOpen={isModalOpen}>
          <button
            onClick={openModal}
            className="w-full h-64 flex flex-col justify-center items-center rounded-lg shadow-lg bg-secondary-100 hover:text-gray-400 active:text-opacity-80 cursor-pointer"
          >
            <MdQueue className="w-20 h-20" />
            <span>Create Playlist</span>
          </button>
        </CreatePlaylistModal>
        {playlists &&
          playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              type={"user"}
            />
          ))}
      </div>
    </section>
  );
};

export default MyPlaylistPage;
