import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "./userApiSlice";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import PlaylistCard from "../Playlist/PlaylistCard";
import { Helmet } from "react-helmet-async";

const UsersPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useGetUserDetailsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className=" text-gray-100">
      <Helmet prioritizeSeoTags>
        <title>{`Users - Jollify`}</title>
        <link
          rel="canonical"
          href={`https://jollify.vercel.app/users/${user._id}`}
        />
        <meta
          name="description"
          content={`Connect with music lovers on Jollify`}
        />
        <meta property="og:title" content="Users - Jollify" />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/users/${user._id}`}
        />
        <meta
          property="og:description"
          content={`Connect with music lovers on Jollify`}
        />
        <meta name="twitter:title" content="Users - Jollify" />
        <meta
          name="twitter:description"
          content="Connect with music lovers on Jollify"
        />
      </Helmet>
      <div
        className={`w-full h-28 md:h-48  bg-gradient-to-r from-transparent via-${selectedTheme} to-transparent relative`}
      ></div>
      <div className="-translate-y-14 md:-translate-y-24 translate-x-5 absolute">
        <div className="w-28 h-28 md:w-48 md:h-48 rounded-full relative bg-secondary-100 shadow-lg  shadow-secondary-100 overflow-hidden">
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              className="w-full h-full rounded-full object-cover cursor-pointer"
            />
          ) : (
            <FaUser className="w-full h-full pt-4 rounded-full object-cover text-gray-400 cursor-pointer" />
          )}
        </div>
        <h1 className="text-xl md:text-3xl font-semibold text-center m-2">
          {user.username}
        </h1>
      </div>
      <div className="mt-32 md:mt-48 mb-8">
        {user.playlist.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-6">Playlists</h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.playlist.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  playlist={playlist}
                  type={"user"}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="md:w-3/4">
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

export default UsersPage;
