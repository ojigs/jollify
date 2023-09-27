import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import EditUserModal from "./EditUserModal";
// import ruger from "../../assets/images/ruger.png";

const UsersPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const user = {
    userId: "1",
    username: "Ojigs",
    email: "ojigs@jollify.com",
    bio: "Music lover and web developer",
    profileImage: "https://jollify.com/user-profile.png",
  };

  return (
    <section className=" text-gray-100">
      <div
        className={`w-full h-28 md:h-48  bg-gradient-to-r from-transparent via-${selectedTheme} to-transparent relative`}
      ></div>
      <div className="-translate-y-14 md:-translate-y-24 translate-x-5 absolute">
        <div className="w-28 h-28 md:w-48 md:h-48 rounded-full relative bg-secondary-100 shadow-lg  shadow-secondary-100">
          {user?.image ? (
            <img
              src=""
              alt=""
              className="w-full h-full rounded-full object-cover cursor-pointer"
            />
          ) : (
            <FaUser className="w-full h-full pt-4 rounded-full object-cover text-gray-400 cursor-pointer" />
          )}
          <h1 className="text-xl md:text-3xl font-semibold text-center m-2">
            {user.username}
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-end sm:flex-row sm:justify-end gap-4 mt-4 text-sm">
        <EditUserModal
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          user={user}
        >
          <button
            onClick={openModal}
            className={`bg-${selectedTheme} hover:bg-${selectedTheme}-50 active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded`}
          >
            Edit
          </button>
        </EditUserModal>
        <button
          className={`bg-transparent  border hover:bg-${selectedTheme} active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded`}
        >
          Log out
        </button>
      </div>

      <div className="mt-14 md:mt-36 md:w-3/4 text-gray-290">
        <div className="px-4 py-6 rounded-lg bg-secondary-100 shadow-sm shadow-gray-700">
          <h2 className="flex gap-8 font-semibold">
            <span className="text-gray-300">Bio: </span>
            <span>{user.bio}</span>
          </h2>
        </div>
        <div className="px-2 py-6 mt-4 rounded-md bg-secondary-100 shadow-sm shadow-gray-700">
          <h2 className="flex gap-8 font-semibold">
            <span className="text-gray-300">Country: </span>
            <span>{user.country}</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
