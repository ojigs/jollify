import { useSelector } from "react-redux";
import { MdQueueMusic } from "react-icons/md";

const CreatePlaylistModal = ({ closeModal, isModalOpen, children }) => {
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <div>
      {children}

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-gray-200 w-96 rounded-lg shadow-lg">
              <div className="absolute top-0 right-0 pt-2 pr-4">
                <button
                  onClick={closeModal}
                  className="text-gray-800 hover:text-gray-600"
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
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Enter playlist title"
                      className="w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Add playlist description"
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
                      className={`bg-${selectedTheme} hover:bg-${selectedTheme} text-white font-bold py-2 px-4 rounded`}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlaylistModal;
