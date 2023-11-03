import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ resource, type }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const { _id, coverImage, title, artiste, createdBy } = resource;
  const creator = {
    id: artiste?._id || createdBy._id,
    name: artiste?.name,
    type: type === "albums" ? "artistes" : "users",
  };
  const navigate = useNavigate();

  const backgroundColors = [
    "bg-yellow-400",
    "bg-pink-400",
    "bg-purple-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-red-400",
    "bg-orange-400",
    "bg-teal-400",
  ];

  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  const selectedBackgroundColor = backgroundColors[randomIndex];

  return (
    <article className="relative w-36 md:w-40 shrink-0 group cursor-pointer shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <div
        onClick={() => navigate(`/${type}/${_id}`)}
        className={`relative rounded-lg ${selectedBackgroundColor} w-full h-36 md:h-40`}
      >
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-36 md:h-40 object-cover rounded-lg"
          />
        )}
        <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-secondary-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      </div>
      <div className="p-2 pt-3">
        <h3 className="md:text-lg font-semibold truncate ...">
          <Link
            to={`/${type}/${resource._id}`}
            className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm md:text-base truncate ...">
          <Link
            to={`/${creator.type}/${creator.id}`}
            className={`text-gray-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
          >
            {creator.name}
          </Link>
        </p>
      </div>
    </article>
  );
};

export default Card;
