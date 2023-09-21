import { useSelector } from "react-redux";
import { FaRegHeart, FaPlay } from "react-icons/fa";
import artisteImage from "../../assets/images/ruger.png";

const HomeFeature = ({ artisteName, albumTitle, songTitle }) => {
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <section className="relative mt-8 text-gray-200">
      <h2 className="text-2xl font-bold mb-4">Featured for you</h2>
      <article className="rounded-lg h-52 text-white  overflow-hidden bg-gradient-to-br from-secondary-200 via-secondary-100 to-primary shadow-lg flex flex-row-reverse justify-between">
        <div className="hidden lg:flex items-center w-1/2 rounded-l-lg">
          <img
            src={artisteImage}
            alt={artisteName}
            className="object-cover w-full bg-center"
          />
        </div>
        <div className="flex-grow flex flex-col justify-between p-12">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              <span className={`text-${selectedTheme}`}>{artisteName}</span>{" "}
              <span className="text-gray-300">in</span> {albumTitle}
            </h2>
            <h3 className="text-xl font-semibold mb-4">{songTitle}</h3>
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
    </section>
  );
};

export default HomeFeature;
