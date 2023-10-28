import { useState } from "react";
import { useSelector } from "react-redux";
import { useEditUserDetailsMutation } from "./userApiSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EditUserModal = ({ closeModal, isModalOpen, user, children }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const [updateUser, { isLoading, isError, error }] =
    useEditUserDetailsMutation();
  const [formData, setFormData] = useState({
    bio: user.bio,
    country: user.country,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await updateUser(formData);
      if (error) {
        console.error(error);
      } else {
        // dispatch(setUser(data));
        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                  <h2 className={`text-2xl text-gray-800 font-semibold`}>
                    Edit Profile
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="john"
                      name="username"
                      value={user.username}
                      className="w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">Bio</label>
                    <input
                      type="text"
                      placeholder="I love Jollify"
                      name="bio"
                      defaultValue={user.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700  mb-1">Country</label>
                    <input
                      type="text"
                      placeholder="Nigeria"
                      name="country"
                      defaultValue={user.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"
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
                      className={`bg-${selectedTheme} hover:bg-${selectedTheme} text-white font-bold py-2 px-4 rounded ${
                        isLoading && "cursor-not-allowed"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
                      ) : (
                        `Done`
                      )}
                    </button>
                  </div>
                </form>
                {isError && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {error?.data?.message}
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

export default EditUserModal;
