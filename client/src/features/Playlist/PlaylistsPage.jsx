import { useDispatch, useSelector } from "react-redux";
import { useGetAllPlaylistsQuery } from "../../app/apiSlice";
import {
  toggleCreatePlaylistModal,
  toggleLoginModal,
  setMessage,
} from "../../app/modalSlice";
import { FaPlus } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import LoginModal from "../../components/LoginModal";

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
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Playlists</h1>
        <CreatePlaylistModal>
          <button
            className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
            onClick={openModal}
          >
            <FaPlus className="text-xs mr-2" />
            <span>Create Playlist</span>
          </button>
        </CreatePlaylistModal>
      </div>
      <p className="mb-8 text-gray-200">
        Unleash your musical journey from our collection of playlists
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
      <LoginModal />
    </section>
  );
};

export default PlaylistsPage;
