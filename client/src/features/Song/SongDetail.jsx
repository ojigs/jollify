import { BsPlay } from "react-icons/bs";
import artisteImage from "../../assets/images/ruger.png";
import bgImage from "../../assets/images/jollifybg.jpg";
import LikeButton from "../../components/LikeButton";

const SongDetail = ({ song }) => {
  const { title, artiste, album, genre, likes } = song;

  return (
    <article
      className="relative bg-secondary-200 md:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${artisteImage})` }}
    >
      <div className=" bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-6 p-6 text-white backdrop-blur-2xl">
        <div
          className="shadow-lg w-48 rounded-md h-48 md:w-60 md:h-60 overflow-hidden bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <img
            src={artisteImage}
            alt={`${title} Cover`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <article className="flex-grow">
          <h2 className="text-2xl text-accent-50 font-bold mb-4">
            {title.toUpperCase()}
          </h2>
          <p className="text-gray-200 hover:text-accent-50 mt-2">{artiste}</p>
          <p className="text-gray-200 hover:text-accent-50 mt-2">
            Album: {album}
          </p>
          <p className="text-gray-200 hover:text-accent-50 mt-2">
            Genre: {genre}
          </p>
          <div className="flex flex-row gap-4 mt-6">
            <button className="inset-0 flex items-center justify-center bg-accent-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-6">
              <span className="mr-2">Play</span>
              <BsPlay className="text-white text-4xl" />
            </button>
            <LikeButton likes={likes} />
          </div>
        </article>
      </div>
    </article>
  );
};

export default SongDetail;
