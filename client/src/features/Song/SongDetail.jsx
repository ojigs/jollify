import { BsPlay } from "react-icons/bs";
import artisteImage from "../../assets/images/ruger.png";

const SongDetail = ({ song }) => {
  const { title, artiste, album, genre } = song;

  return (
    <article
      className="relative bg-secondary-200 h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${artisteImage})` }}
    >
      <div className="absolute bg-primary bg-opacity-60 inset-0 rounded-md flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-6 p-6 text-white backdrop-blur-2xl">
        <div className="border w-48 h-60 overflow-hidden">
          <img
            src={artisteImage}
            alt={`${title} Cover`}
            className="w-48 h-60 object-contain rounded-lg"
          />
        </div>
        <article className="flex-grow">
          <h2 className="text-2xl hover:text-accent-50 font-bold mb-4">
            {title}
          </h2>
          <p className="text-gray-200 hover:text-accent-50 mt-2">{artiste}</p>
          <p className="text-gray-200 hover:text-accent-50 mt-2">
            Album: Ru da World
          </p>
          <p className="text-gray-200 hover:text-accent-50 mt-2">
            Genre: Afropop
          </p>
          <div className="mt-6">
            <button className="inset-0 flex items-center justify-center bg-accent-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-6">
              <span className="mr-2">Play</span>
              <BsPlay className="text-white text-4xl" />
            </button>
          </div>
        </article>
      </div>
    </article>
  );
};

export default SongDetail;
