import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { useCreatePlaylistMutation } from "../../Playlist/playlistApiSlice";
import { MdQueueMusic } from "react-icons/md";
import { toggleCreatePlaylistModal } from "../../../app/modalSlice";
import { toast } from "react-toastify";

const CreatePlaylistModal = ({ children }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isCreatePlaylistModal } = useSelector((state) => state.modal);
  const [createPlaylist, { isLoading, error }] = useCreatePlaylistMutation();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [validationErrors, setValidationErrors] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleCreatePlaylistModal());
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();

    try {
      if (!formData.title) {
        setValidationErrors("Please give your playlist a title");
        return;
      }
      const sanitizedFormData = {};

      for (const [key, value] of Object.entries(formData)) {
        sanitizedFormData[key] = DOMPurify.sanitize(value);
      }

      await toast.promise(createPlaylist(sanitizedFormData).unwrap(), {
        pending: "Loading...",
        success: "Playlist creation successful",
        error: "An error occurred",
      });
      if (error) {
        console.error(error);
      } else {
        closeModal();
        setValidationErrors(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {children}
      {isCreatePlaylistModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-gray-200 w-96 rounded-lg shadow-lg">
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
                    Create Playlist
                  </h2>
                </div>
                <form onSubmit={handleCreatePlaylist}>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter playlist title"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value.trim(),
                        })
                      }
                      className="w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="3"
                      placeholder="Add playlist description"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-gray-400 bg-gray-200 resize-none focus:outline-none rounded-md p-2  text-gray-800"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mr-2 text-gray-800 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`bg-${selectedTheme} ${
                        !isLoading
                          ? `hover:bg-${selectedTheme}-50 active:translate-y-[1px]`
                          : `bg-opacity-50 cursor-not-allowed`
                      } text-white text-center font-bold py-2 px-4 rounded`}
                      disabled={isLoading}
                    >
                      Create
                    </button>
                  </div>
                </form>
                {validationErrors && (
                  <span className="block text-sm mt-2 text-center font-bold saturate-100 text-red-500">
                    {validationErrors}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlaylistModal;
