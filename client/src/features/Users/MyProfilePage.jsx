import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUploadImageMutation, useGetCurrentUserQuery } from "./userApiSlice";
import { useLogoutUserMutation } from "../Auth/authApiSlice";
import EditUserModal from "./EditUserModal";
import ErrorMsg from "../../components/ErrorMsg";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const MyProfilePage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: user,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError,
  } = useGetCurrentUserQuery();
  const imageRef = useRef(null);
  const [uploadImage, { isError, error }] = useUploadImageMutation();
  const [logOut, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleImageInputClick = () => {
    imageRef.current.click();
  };

  if (isCurrentUserLoading) {
    return <Loading />;
  }

  if (isCurrentUserError) {
    return <ErrorMsg error={currentUserError} />;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await toast.promise(uploadImage(formData).unwrap(), {
        pending: "Uploading...",
        success: "Upload successful",
        error: "An error occurred",
      });
      if (isError) {
        console.error(error);
      }
    }
  };

  const handleLogOut = async () => {
    const { error } = await logOut().unwrap();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className=" text-gray-100">
      <Helmet>
        <title>My Profile - Jollify</title>
      </Helmet>
      <div
        className={`w-full h-28 md:h-48  bg-gradient-to-r from-transparent via-${selectedTheme} to-transparent relative`}
      ></div>
      <div className="-translate-y-14 md:-translate-y-24 translate-x-5 absolute">
        <div
          className="w-28 h-28 md:w-48 md:h-48 rounded-full relative bg-secondary-100 shadow-lg  shadow-secondary-100 overflow-hidden"
          onClick={handleImageInputClick}
        >
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              className="w-full h-full rounded-full object-cover cursor-pointer"
            />
          ) : (
            <FaUser className="w-full h-full pt-4 rounded-full object-cover text-gray-400 cursor-pointer" />
          )}
          <span className="absolute left-0 bottom-0 text-center w-full p-1 text-sm sm:text-base bg-secondary-200 bg-opacity-50 cursor-pointer">
            Upload
          </span>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            ref={imageRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold text-center m-2">
          {user.username}
        </h1>
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
          className={`bg-transparent  border hover:bg-${selectedTheme} active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded  ${
            isLoading && "cursor-not-allowed"
          }`}
          onClick={handleLogOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin m-auto text-lg text-gray-400" />
          ) : (
            `Log out`
          )}
        </button>
      </div>

      <div className="mt-14 md:mt-36 md:w-3/4">
        <div className="px-4 py-6 rounded-lg bg-secondary-100 shadow-sm shadow-gray-700">
          <h2 className="flex gap-8 font-semibold">
            <span className="text-gray-300">Bio: </span>
            <span>{user.bio}</span>
          </h2>
        </div>
        <div className="px-4 py-6 mt-4 rounded-md bg-secondary-100 shadow-sm shadow-gray-700">
          <h2 className="flex gap-8 font-semibold">
            <span className="text-gray-300">Country: </span>
            <span>{user.country}</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MyProfilePage;
