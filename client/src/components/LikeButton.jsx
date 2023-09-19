import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ isLiked, onToggleLike }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
    onToggleLike(!liked);
  };

  return (
    <button
      className={`${
        liked ? "text-accent" : "text-gray-400"
      } transition-colors duration-300 ease-in-out focus:outline-none`}
      onClick={handleLikeClick}
    >
      {liked ? (
        <FaHeart className="text-2xl" />
      ) : (
        <FaRegHeart className="text-2xl" />
      )}
    </button>
  );
};

export default LikeButton;
