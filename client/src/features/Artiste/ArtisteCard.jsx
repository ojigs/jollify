import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserAstronaut } from "react-icons/fa";

const ArtisteCard = ({ artiste }) => {
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <article className="group w-28 md:w-40 transition transform hover:scale-105">
      <div className="relative bg-secondary-100 rounded-full w-28 md:w-40 h-28 md:h-40 shadow-lg">
        <Link to={`/artistes/${artiste._id}`}>
          {artiste.image ? (
            <img
              src={artiste.image}
              alt={artiste.name}
              className="w-full h-28 md:h-40 object-cover rounded-full relative"
            />
          ) : (
            <FaUserAstronaut className="w-full p-2 h-28 md:h-40 rounded-full text-gray-400" />
          )}
        </Link>
      </div>
      <div className="p-4 text-center">
        <Link
          to={`/artistes/${artiste._id}`}
          className={`md:text-lg font-semibold mb-1 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
        >
          {artiste.name}
        </Link>
      </div>
    </article>
  );
};

export default ArtisteCard;