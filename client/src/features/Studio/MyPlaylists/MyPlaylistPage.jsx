import { useState } from "react";
import { useSelector } from "react-redux";
import { MdQueue } from "react-icons/md";
import PlaylistCard from "../../Playlist/PlaylistCard";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useGetCurrentUserQuery } from "../../../app/apiSlice";
import Loading from "../../../components/Loading";
import ErrorMsg from "../../../components/ErrorMsg";

const emptyArray = [];

const MyPlaylistPage = () => {
  const { id } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: playlists,
    isLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(id, {
    skip: !id,
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data: data?.playlist ?? emptyArray,
      isLoading,
      isError,
      error,
    }),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container text-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold mb-8">My Playlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CreatePlaylistModal closeModal={closeModal} isModalOpen={isModalOpen}>
          <button
            onClick={openModal}
            className="w-full h-64 flex flex-col gap-2 justify-center items-center rounded-lg shadow-lg bg-secondary-100 hover:text-gray-400 active:text-opacity-80 cursor-pointer"
          >
            <MdQueue className="text-3xl" />
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
