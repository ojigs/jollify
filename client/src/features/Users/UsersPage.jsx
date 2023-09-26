import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
// import ruger from "../../assets/images/ruger.png";

const UsersPage = () => {
  const selectedTheme = useSelector((state) => state.theme);

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
        className={`w-full h-36 md:h-48 bg-${selectedTheme} bg-gradient-to-r from-transparent via-gray-100 to-secondary-200 relative`}
      ></div>
      <div className="-translate-y-16 md:-translate-y-24 translate-x-5">
        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full relative bg-secondary-100 shadow-lg">
          {user?.image ? (
            <img
              src=""
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUser className="w-full h-full pt-4 rounded-full object-cover text-gray-400" />
          )}
          <h1 className="text-3xl font-semibold text-center m-2">
            {user.username}
          </h1>
        </div>
      </div>
      {user ? (
        <>
          <div className="mt-4">
            <p className="mt-2">Bio: {user.bio}</p>
            <p className="mt-2">Country: {user.country}</p>
          </div>
        </>
      ) : (
        <p>
          <FaSpinner />
        </p>
      )}
    </section>
  );
};

export default UsersPage;
