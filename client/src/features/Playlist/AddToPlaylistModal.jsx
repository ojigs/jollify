import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../Users/userApiSlice";
import { useAddSongToPlaylistMutation } from "./playlistApiSlice";
import {
  toggleAddToPlaylistModal,
  toggleCreatePlaylistModal,
} from "../../app/modalSlice";
import { MdQueueMusic } from "react-icons/md";
import { FaHeadphones, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const emptyArray = [];

const AddToPlaylistModal = ({ children }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAddToPlaylistModal, addSongId: songId } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const {
    data: playlists,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data: data?.playlist ?? emptyArray,
      isLoading,
      isError,
      error,
    }),
  });
  const [addSong, { error: addError }] = useAddSongToPlaylistMutation();

  const closeModal = () => {
    dispatch(toggleAddToPlaylistModal());
  };

  const handleAddSong = async (playlistId) => {
    await toast.promise(addSong({ playlistId, songId }).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
          return "Song added to playlist";
        },
      },
      error: "An error occurred",
    });
    if (addError) {
      console.error(addError);
    }
    closeModal();
  };

  const openModal = () => {
    dispatch(toggleCreatePlaylistModal());
  };

  if (isError) {
    console.log(error);
  }

  return (
    <>
      {children}
      {isAddToPlaylistModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-gray-200 w-96 h-96 overflow-y-auto rounded-lg shadow-lg">
              <div className="absolute top-0 right-0 pt-2 pr-4">
                <button
                  onClick={closeModal}
                  className="text-gray-800 hover:text-gray-200 hover:bg-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`p-2 rounded-full bg-${selectedTheme} bg-opacity-20`}
                  >
                    <MdQueueMusic
                      className={`text-4xl text-${selectedTheme}`}
                    />
                  </span>
                  <h2 className={`text-2xl text-gray-800 font-semibold`}>
                    Add Song to Playlist
                  </h2>
                </div>
                <div className="text-gray-700 mt-8">
                  <ul className="flex flex-col gap-2">
                    <li
                      key={"createPlaylist"}
                      onClick={openModal}
                      className="flex flex-row gap-3 items-center cursor-pointer hover:text-gray-950"
                    >
                      <button
                        className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 w-20 h-20 rounded-md`}
                      >
                        <FaPlus className="text-gray-200 text-lg" />
                      </button>
                      <span>Create playlist</span>
                    </li>
                    {playlists &&
                      playlists.map((playlist) => (
                        <li
                          key={playlist._id}
                          onClick={() => handleAddSong(playlist._id)}
                          className="flex flex-row gap-3 items-center cursor-pointer hover:text-gray-950"
                        >
                          <div className="w-20 h-20 bg-gray-400 rounded-md">
                            <span>
                              {playlist.coverImage ? (
                                <img
                                  src={playlist.coverImage}
                                  alt={playlist.title}
                                  className="w-full h-full object-cover rounded-md relative"
                                />
                              ) : (
                                <FaHeadphones className="w-full h-full p-4 text-gray-200" />
                              )}
                            </span>
                          </div>
                          <span>{playlist.title}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToPlaylistModal;
