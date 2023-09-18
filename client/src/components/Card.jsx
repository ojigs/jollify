const Card = ({ coverImage, title, name }) => {
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
    <article className="relative basis-36 md:basis-40 shrink-0 group cursor-pointer shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <div className={`relative rounded-lg ${selectedBackgroundColor}`}>
        <img
          src={coverImage}
          alt={title}
          className="w-full h-36 md:h-40 object-cover"
        />
        <div className="absolute rounded-lg inset-0 bg-gradient-to-tr from-primary via-secondary-500 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      </div>
      <div className="p-4 pl-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{name}</p>
      </div>
    </article>
  );
};

export default Card;
