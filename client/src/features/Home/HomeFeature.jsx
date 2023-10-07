import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegHeart, FaPlay } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import ErrorMsg from "../../components/ErrorMsg";
import { useGetAnySongQuery } from "../../app/apiSlice";

const HomeFeature = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { data: song, isLoading, isError, error } = useGetAnySongQuery();

  return (
    <section className="relative mt-8 text-gray-200">
      <h2 className="text-2xl font-bold mb-4">Featured for you</h2>
      {isLoading ? (
        <div className="flex-grow flex justify-center items-center h-36 md:h-40">
          <AiOutlineLoading className="text-3xl animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex-grow h-36 md:h-40">
          <ErrorMsg error={error} />
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden shadow-[0px_10px_15px_-7px_rgba(0,0,0,0.3)] shadow-primary">
          <article
            className={`rounded-lg h-52 text-white overflow-hidden bg-${selectedTheme} transition transform flex flex-row-reverse justify-between`}
          >
            <div className="hidden lg:flex items-center relative w-1/2 rounded-l-lg">
              <img
                src={song?.artiste.image}
                alt={song?.artiste.name}
                className="object-cover w-full bg-center"
              />
              <div
                className={`absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-${selectedTheme} to-transparent`}
              ></div>
            </div>
            <div className="flex-grow flex flex-col justify-between p-12">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  <Link
                    to={`/artistes/${song?.artiste._id}`}
                    className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-white`}
                  >
                    {song?.artiste.name}
                  </Link>{" "}
                  <span className="text-gray-300">in</span>{" "}
                  <Link
                    to={`/albums/${song?.album._id}`}
                    className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-white`}
                  >
                    {song?.album.title}
                  </Link>
                </h2>
                <h3 className="text-xl font-semibold mb-4">
                  <Link
                    to={`/songs/${song._id}`}
                    className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-white`}
                  >
                    {song?.title}
                  </Link>
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-outline-gray hover:text-secondary-500">
                  <FaPlay className="text-base md:text-2xl" />
                </button>
                <button className="bg-secondary-400 text-white rounded-full p-2">
                  <FaRegHeart className="text-base md:text-2xl " />
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default HomeFeature;
